export function Loading() {
    return <p className="muted" role="status">Loading Menus...</p>
}

export function ErrorMessage({ message, onRetry }) {
    return (
        <div className="card error" role="alert">
            <p>Could not load menus: {message} </p>
            <button className="btn" onClick={onRetry}>Try Again</button>
        </div>
    )
}

