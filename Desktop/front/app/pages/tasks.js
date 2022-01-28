import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/Link'

const Home = (props) => {
    return (
      // <div>
      //   <h2>
      //       POSTの一覧
      //     </h2>
      //     <table>
      //       {props.tasks.map((post) =>
      //         <tr>
      //           <td>{post.id}.</td>
      //           <td>{post.content}</td>
      //         </tr>
      //       )}
      //     </table>
          <h2><Link href="/">Back to home</Link></h2>
      // </div>
    )
  }
  
  // export const getStaticProps = async () => {
  //   // URLはlocalhostではなくapiとなる
  //   const response = await fetch("http://api:3000/tasks", {method: "GET"});
  //   const json = await response.json();
  
  //   return {
  //     props: {
  //       posts: json
  //     },
  //   };
  // }

  export const getStaticProps = async () => {
    const res = await fetch(`http://api:3000/tasks`, {method: "POST"})
    const data = await res.json()
  
    return {
      props: { tasks: data, generatedAt: new Date().toLocaleString('ja') },
      // props: { skills: data, generatedAt: new Date().toLocaleString('ja') },
      // revalidate: 10,
    }
  }
  
  export default Home;