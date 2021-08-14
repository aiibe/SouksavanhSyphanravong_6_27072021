import Markup from "../refresh/markup";

// Display error page
class Error404 extends Markup {
    constructor(selector){
        super(selector)
    }

    render(){
        return `
        <div>
            <h1>Page not found</h1>
            <a href=".">Navigate back Home</a>
        </div>
        `
    }
}

export default Error404