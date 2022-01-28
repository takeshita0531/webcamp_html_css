import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router"
// import styles from '../styles/Home.module.css'
import Link from 'next/Link'
import React from 'react';
// import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
// import Index from './Index';
import New from '../../components/New';
import Edit from '../../components/Edit';
import Search from '../../components/Search'
import Index from '../../components/Index'
import App from '../../components/App'
import Select from '../select'

// import axios from 'axios';
// import './Index.css';
// import '../css/tailwind.css';

const Home = (props) => {
  const router = useRouter()
  const { post_id } = router.query
    return (
      <div>
        {/* <Index
          post_id={post_id}
        /> */}
        {post_id} 
        {console.log(post_id)}
          {/* <Select /> */}
        {/* <h2>
            POSTの一覧
          </h2>
            <Index 
              tasks={props.tasks}
            />
          <h2><Link href="/tasks">Back to home</Link></h2> */}
      </div>
    )
  }
  
  export const getStaticProps = async () => {
    // URLはlocalhostではなくapiとなる
    const response = await fetch("http://api:3000/tasks", {method: "GET"});
    const json = await response.json();
  
    return {
      props: {
        tasks: json
      },
    };
  }
  
  export default Home;