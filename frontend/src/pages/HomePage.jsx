import reactlogo from '../assets/react.svg'
import viteLogo from '../../public/vite.svg'
import djangoLogo from '../assets/django-logo-negative.svg'
import django_rest_logo from '../assets/django_rest.svg'

function HomePage() {
  return (
    <main className="flex-1 flex items-center justify-center flex-col">
      <div className="flex items-center justify-between mb-4 gap-11">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="h-24" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactlogo} className="h-24" alt="React logo" />
        </a>
        <a href="https://www.djangoproject.com/" target="_blank">
          <img src={djangoLogo} className="h-24" alt="Django logo" />
        </a>
        <a href="https://www.django-rest-framework.org/" target="_blank">
          <img src={django_rest_logo} className="h-24" alt="Django REST Framework logo" />
        </a>
      </div>
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Frontend: Vite + React + Tailwind CSS
        <br className="hidden sm:block"/>
        <span className="block my-4"></span>
        Backend: Django + Django REST Framework
      </h1>
      <h6 className="text-base mt-4 text-center">
        Página en construcción
      </h6>
    </main>
  )
}

export default HomePage