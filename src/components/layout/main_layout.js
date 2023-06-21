import Header from './header_layout.js'
import Footer from './footer_layout.js'

function Layout(props){
  return(
    <div className='layout'>
      <Header/>
        <main>
          {props.children}
        </main>
      <Footer/>
    </div>
  )
}

export default Layout;