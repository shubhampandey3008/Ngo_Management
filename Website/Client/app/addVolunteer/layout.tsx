export default function addVolunteerLayout({
    children
} : {
    children : React.ReactNode
}){
    return (
        <section>
            <nav></nav>
            {children}
        </section>
    )
}