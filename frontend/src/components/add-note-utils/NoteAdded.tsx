
type NoteAddedType = {
    msg: string;
    className: string;
}

const NoteAdded = ({msg, className}: NoteAddedType) => {
    return (
        <div className={className}>{msg}</div>
    )
}

export default NoteAdded