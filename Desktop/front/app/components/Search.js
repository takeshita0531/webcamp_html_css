import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
// import { Link, useNavigate } from 'react-router-dom';
// import './Index.css';
import Edit from './Edit';
import * as Yup from 'yup';
// import { getStaticProps } from '../../../api/app/pages/list';
// import List from '../pages/index'



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

function Search(props) {
    const [posts, setPosts] = useState([]);
    const [searchContent, setSearchContent] = useState('')
    const [edit, setEdit] = useState({
        id: "",
        editing: false
    })

    useEffect(() => {
        axios.get('/tasks.json')
        .then(resp => {
            setPosts(resp.data);
        });
    }, []);

    const updatePost = (post, key) => {
        var data = {
            content: post.content,
            check: !post.check
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

    const handleChangeTodoAttribute = (id, key, value) => {
        var data = ({
            id: id,
            editing: false
        })
        if (id === edit.id) {
            setEdit(data)
        }
        console.log(id)
      };

    let getPost;
    let getPostDueDate;
    let getPostId
    posts.map((post) => {
        if (post.id === edit.id) {
            getPost = post.content
            getPostId = post.id
            getPostDueDate = post.duedate
        }
          
    })

    return(
        <div>
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
            <div>
                <div className="flex justify-center">
                    <input className="flex justify-center border border-indigo-600" type="text" placeholder="投稿検索" onChange={event => {setSearchContent(event.target.value)}}/>
                </div>
                <div className="flex justify-center">

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
                                {props.tasks.filter((task) => {
                                    if(searchContent === "") {
                                        return task
                                    }else if (task.content.includes(searchContent)) {
                                        return task
                                    }
                                }).map((task, key) => {
                                    return(
                                        <tr>
                                        <td className="w-3 border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4" key={key}>
                                            {task.check ? (
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
                                            {task.content}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                            {task.duedate}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                            <button onClick={() => handleClickEdit(post)} className="bg-blue-700 font-semibold text-white py-2 px-4 rounded">
                                                編集
                                            </button>
                                        </td> 
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                            <button className="bg-red-700 font-semibold text-white py-2 px-4 rounded">
                                                <a href="" onClick={(e) => removePost(task.id, e)}>削除</a>
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                            {/* {posts.filter((post) => {
                                if(searchContent === "") {
                                    return post
                                }else if (post.content.includes(searchContent)) {
                                    return post
                                }
                            }).map((post, key) => {
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
                                );
                            })} */}
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
            
        </div>
    );
};

export default Search;