"use client"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import startupFormSchema from "@/lib/schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import MDEditor from '@uiw/react-md-editor'
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useState } from "react"
import createStartup from "@/lib/action"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const startupCreate = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("")
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof startupFormSchema>>({
        resolver: zodResolver(startupFormSchema)
      })
    const handleFormSubmit = async (prevState: any, formInfo: FormData) => {
        try{
            const formValues = {
                "title": formInfo.get("title") as string,
                "description": formInfo.get("description") as string,
                "category": formInfo.get("category") as string,
                "image": formInfo.get("image") as string,
                "pitch": pitch             
            }
            await startupFormSchema.parseAsync(formValues)
            
            const newStartup = await createStartup(prevState, formInfo, pitch)
            toast({
                title: "Submitted successfully",
                description: "Your new startup has been created successfully"
            })
            
            router.push(`./startupDetail/${newStartup._id}`)
            return newStartup
        }catch(error){
            // If the form error is a validation error
            if(error instanceof z.ZodError){
                const errorFields = error.flatten().fieldErrors as unknown as Record<string, string>
                setErrors(errorFields)
                toast({
                    title: "Validation Error",
                    description: "Validation failed, please check your form input."
                })
                return {...prevState, error: "Validation failed, please check your form input.", status: "ERROR"}
            }
            toast({
                title: "An unexpected Error",
                description: "An unexpected error has occurred"
            })
            return {...prevState, error: "An unexpected error has occurred", status: "ERROR"}
        }
    }
    const [startupInfo, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"})
    return(
        <div>
            <section className="r-container !min-[250px]">
                <h1 className="heading">Create your startup here!</h1>
            </section>
            <Form {...form}>
                <form action={formAction} className="startup-form">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel className="startup-form_label">Title</FormLabel>
                            <FormControl>
                                <Input className="startup-form_input" placeholder="Your startup title" {... field}/>
                            </FormControl>
                            {errors.title && <FormMessage className="startup-form_error">{errors.title}</FormMessage>}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel className="startup-form_label">Description</FormLabel>
                            <FormControl>
                                <Textarea className="startup-form_textarea" placeholder="Your startup description" {... field}/>
                            </FormControl>
                            {errors.description && <FormMessage className="startup-form_error">{errors.description}</FormMessage>}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel className="startup-form_label">Category</FormLabel>
                            <FormControl>
                                <Input className="startup-form_input" placeholder="Your startup category" {... field}/>
                            </FormControl>
                            {errors.category && <FormMessage className="startup-form_error">{errors.category}</FormMessage>}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel className="startup-form_label">Image URL</FormLabel>
                            <FormControl>
                                <Input className="startup-form_input" placeholder="Your startup image url" {... field}/>
                            </FormControl>
                            {errors.image && <FormMessage className="startup-form_error">{errors.image}</FormMessage>}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pitch"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel className="startup-form_label">Pitch</FormLabel>
                            <FormControl>
                                <MDEditor
                                    value={pitch}
                                    onChange={e => setPitch(e as string)}
                                />                        
                            </FormControl>
                            {errors.pitch && <FormMessage className="startup-form_error">{errors.pitch}</FormMessage>}
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending} className="startup-form_btn">{isPending ? "Submitting" : "Submit"}<Send/></Button>
                </form>
            </Form>
        </div>
      
    )
}

export default startupCreate