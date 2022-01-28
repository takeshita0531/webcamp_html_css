import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/Link'
import React from 'react';
// import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
// import Index from './Index';
import New from '../components/New';
import Edit from '../components/Edit';
import Search from '../components/Search'
import Index from '../components/Index'
import App from '../components/App'
import Select from './select'

// import axios from 'axios';
// import './Index.css';
// import '../css/tailwind.css';

const Home = (props) => {
    return (
      <div>
          {/* <h2><Link href="/tasks">投稿一覧</Link></h2>
          <h2><Link href="/new">新規投稿</Link></h2>
          <h2><Link href="/search">投稿検索</Link></h2> */}
          <Select />
          <New />
        <h2>
            POSTの一覧
          </h2>
          <table>
            {props.tasks.map((post) =>
              <tr>
                <td>{post.id}.</td>
                <td>{post.content}</td>
              </tr>
            )}
          </table>
          <h2><Link href="/tasks">Back to home</Link></h2>
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
