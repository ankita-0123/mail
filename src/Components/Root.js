import MainNav from "./MainNav";

const Root=(props)=>{
return (
    <>
    <MainNav/>
    <main>
        {props.children}
    </main>
    </>
)
}
export default Root;