import { NavLink, Link } from 'react-router-dom'

function NavbarComponent() {
    const routes = [
    {
        path: '/',
        label: 'Home'
    },
    {
        path: '/products',
        label: 'Products'
    },
    {
        path: '/contact',
        label: 'Contact'
    }
    ]

    return (
        <header className='bg-slate-400 mb-[50px]'>
            <div className='container mx-auto flex justify-between items-center h-[100px]'>
                <h1 className='text-3xl'>
                    <Link 
                    to="/"
                    >
                        LOGO
                    </Link>
                </h1>

                <ul className='flex items-center gap-[30px]'>
                    {routes.map((el, i) => {
                        return( 
                        <li 
                        key={i}
                        >
                            <NavLink 
                            to={el.path}
                            >
                                {el.label}
                            </NavLink>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </header>
    )
}

export default NavbarComponent