
const RightAside = () => {
    return (
        /* hide side for screen smaller than iPad */

        <aside className="col-span-1 border w-[100] hidden md:block">
            <div className="border">
                <h1>Right Aside</h1>
            </div>
            <div className="border">
                <h1>Score</h1>
            </div>
        </aside>
    )
}

export default RightAside