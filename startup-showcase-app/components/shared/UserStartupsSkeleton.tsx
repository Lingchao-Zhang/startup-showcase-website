import { Skeleton } from "../ui/skeleton"

const UserStartupsSkeleton = () => {
    const array = ["ppp", "AG", "PP", "R", "HHW"]
return(
    <>
    {
         array.map((index: string) => {
            <Skeleton id={index}/>
        })
    }
    </>
    )
}

export default UserStartupsSkeleton