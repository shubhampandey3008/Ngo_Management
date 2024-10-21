export default function addStudentLayout({
    children
} : {
    children : React.ReactNode
})
{
    return (
        <section>
            <nav></nav>
            {children}
        </section>
    );
}