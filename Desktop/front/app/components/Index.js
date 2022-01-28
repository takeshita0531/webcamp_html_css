import React, { useState, useEffect } from 'react';
import Edit from './Edit';
import axios from 'axios';
import styled from 'styled-components';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import List from '../pages/index'
import IndexJs from '../pages/index'


// import { Link, useNavigate } from 'react-router-dom';
// import './Index.css';
// import '../css/tailwind.css';


const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

function Index(props) {
    const [posts, setPosts] = useState([]);
    // const [searchContent, setSearchContent] = useState('')
    const [edit, setEdit] = useState({
        id: "",
        editing: false
    })

    useEffect(() => {
        axios.get('/tasks.json')
        .then(resp => {
            setPosts(resp.data);
            // console.log(resp.date)
        });
    }, []);

    const updatePost = (post, key) => {
        var data = {
            content: post.content,
            check: !post.check,
        };
        axios.patch(`/tasks/${post.id}.json`, data)
        .then(resp => {
            const newPosts = [...posts];
            newPosts[key].check = resp.data.check
            setPosts(newPosts);
        });
    };

    const removePost = (postId) => {
        const sure = window.confirm('削除しますか？')
        if (sure) {
            axios.delete('/tasks/' + postId)
            .then(resp => {
            });
        };
    };

    const handleClickEdit = (post) => {
        var data = ({
            id: post.id,
            editing: true
        })
        setEdit(data)
    };

    let getPost;
    let getPostId;
    let getPostDueDate

    posts.map((post) => {
        if (post.id === edit.id) {
            getPost = post.content
            getPostId = post.id
            getPostDueDate = post.duedate
        }
          
    })

    const handleChangeTodoAttribute = (id, key, value) => {
        var data = ({
            id: id,
            editing: false
        })
        if (id === edit.id) {
            setEdit(data)
        }
        // console.log(id)
      };

    return(
        
        <div className="w-full mb-12 px-4 flex justify-center">
            {/* {props.content}
            {props.duedate} */}
            {/* <List /> */}
            {edit.editing? (
                <div>
                    <Edit 
                        id={getPostId}
                        content={getPost}
                        duedate={getPostDueDate}
                        onCancel={handleChangeTodoAttribute}
                    />
                </div>
            ):(
            <div className="relative flex flex-col min-w-0 break-words w-6/12 mb-6 shadow-lg rounded bg-pink-900 text-white">
                <table className="items-center bg-transparent border-collapse">
                    <thead  data-type="ok">
                        <tr>
                            <th className="px-6 align-middle border border-solid py-3 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700"></th>
                            <th className="px-6 align-middle border border-solid py-3 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">内容</th>
                            <th className="px-6 align-middle border border-solid py-3 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">期日</th>
                            <th className="px-6 align-middle border border-solid py-3 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700"></th>
                            <th className="px-6 align-middle border border-solid py-3 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {console.log(props.tasks)} */}
                        {props.tasks.map((post, key) => {
                            return(
                                <tr>
                                    <td className="w-3 border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4" key={key}>
                                        {post.check ? (
                                            <CheckedBox>
                                            {/* <IndexJs
                                                task_id={post.id}
                                            /> */}
                                                <ImCheckboxChecked onClick={() => updatePost(post, key) } />
                                            </CheckedBox>
                                        ) : (
                                            <UncheckedBox>
                                                <ImCheckboxUnchecked onClick={() => updatePost(post, key) } />
                                            </UncheckedBox>
                                        )}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                        {post.content}
                                    </td>
                                    
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                        {post.duedate}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                    <button onClick={() => handleClickEdit(post)} className="bg-blue-700 font-semibold text-white py-2 px-4 rounded">
                                        編集
                                    </button>
                                    </td> 
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                        <button className="bg-red-700 font-semibold text-white py-2 px-4 rounded">
                                            <a href="" onClick={(e) => removePost(post.id, e)}>削除</a>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        {/* {posts.map((post, key) => {
                            return(
                                <tr>
                                    <td className="w-3 border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4" key={key}>
                                        {post.check ? (
                                            <CheckedBox>
                                                <ImCheckboxChecked onClick={() => updatePost(post, key) } />
                                            </CheckedBox>
                                        ) : (
                                            <UncheckedBox>
                                                <ImCheckboxUnchecked onClick={() => updatePost(post, key) } />
                                            </UncheckedBox>
                                        )}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                    {props.content}
                                    </td>
                                    
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                        {post.duedate}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                    <button onClick={() => handleClickEdit(post)} className="bg-blue-700 font-semibold text-white py-2 px-4 rounded">
                                        編集
                                    </button>
                                    </td> 
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                        <button className="bg-red-700 font-semibold text-white py-2 px-4 rounded">
                                            <a href="" onClick={(e) => removePost(post.id, e)}>削除</a>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })} */}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

export default Index;