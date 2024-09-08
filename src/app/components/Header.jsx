import './Header.scss'

function Header({ headerValue }) {
    return (
        <div className="header">
            <h1 className='headerFont'>
                {headerValue}
            </h1>
        </div>
    )
}

export default Header