export default function VolunteerLayout({
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