export default function volunteerListLayout({
    children
} : {children : React.ReactNode}){

    return (
        <><nav></nav><section>
            {children}
        </section></>
    )
}