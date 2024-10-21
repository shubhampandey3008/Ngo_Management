export default function studentListLayout({
    children
} : {children : React.ReactNode}){

    return (
        <><nav></nav><section>
            {children}
        </section></>
    )
}