export default function volunteerAttLayout({
    children
} : {children : React.ReactNode}){

    return (
        <><nav></nav><section>
            {children}
        </section></>
    )
}