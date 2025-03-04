"use client"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { redirect } from "next/navigation"
const SearchFormReset = () => {
    const resetForm = () => {
        const searchForm = document.querySelector(".search-form") as HTMLFormElement
        if(searchForm){
            searchForm.reset()
        }
        redirect("/")
    }
    return(
        <Button className="search-btn" type="reset" onClick={resetForm}>
            <X/>
        </Button>
    )
}

export default SearchFormReset
