import Form from "next/form"
import { Button } from "../ui/button"
import { Search } from "lucide-react"
import SearchFormReset from "./SearchFormReset"

const SearchForm = ({query}: {query?: string}) => {
    return(
      <Form className="search-form" scroll={false} action="/">
        <input 
         className="search-input"
         name="query"
         placeholder="Enter your startups here"
         defaultValue={query}
        />
        {
            query &&  
            <SearchFormReset />
        }
        <Button className="search-btn" type="submit"><Search/></Button>
      </Form>
    )
}

export default SearchForm

