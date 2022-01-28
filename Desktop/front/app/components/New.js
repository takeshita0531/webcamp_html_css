import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import ja from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import List from '../pages/index'
// import { useForm } from "react-hook-form";

// jaのロケールの設定が週頭が月曜始まりになっているので日曜始まりにする
ja.options.weekStartsOn = 0;
// ReactDatepickerのロケール登録
registerLocale('ja', ja);

function New() {
    const [content, setPost] = useState("");
    const [dueDate, setDate] = useState("");
    // const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = () => {
        var data = {
            content: content,
            duedate: dueDate
        };
        fetch('/tasks', {method: 'POST'})
        // .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
        // console.log(value.title);
        // fetch("/tasks", {
        //   method: 'POST', // or 'PUT'
        // });
        // .then(resp => {
        //     setPost(resp.data)
        // })
    }

    
    

    const savePost = event => {
        var data = {
            content: content,
            duedate: dueDate
        };
        // console.log(dueDate)
        event.preventDefault();
        axios.post('/tasks', data)
        .then(resp => {
            setPost(resp.data)
        });
    };

    var handleChange = date => {
        setDate(date);
        console.log(date)
    };

    var eraHandler = yearNow => {

        const generate = (era, startYear) => {
            let yearDsp = yearNow - startYear + 1;
            if (yearDsp === 1) {
                yearDsp = "元";
            } else {
                yearDsp = ('00' + yearDsp).slice(-2);
            }
            return `${era}${yearDsp}年`;
        };

        if (yearNow >= 2019) {
            return generate('令和', 2019);
        }

        if (yearNow >= 1989) {
            return generate('平成', 1989);
        }

        if (yearNow >= 1926) {
            return generate('昭和', 1926);
        }

        if (yearNow >= 1912) {
            return generate('大正', 1912);
        }
    }
    
    var startYear = 1912;
    var futureListUp = 5;
    var years = Array.from({ length: getYear(new Date()) - startYear + futureListUp }, (v, k) => k + startYear).reverse();
    const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    return(
        <div className="flex justify-center">
            {/* <List /> */}
            <form>
                <label className="block">
                    <span className="text-gray-700">新規投稿</span>
                    <input
                        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                        type="text"
                        name="content"
                        placeholder="投稿を入力してください"
                        value={content}
                        onChange={e => setPost(e.target.value)}
                    />
                </label>
                <label className="block">
                <span className="text-gray-700">期日設定</span>
                    
                <React.Fragment>
                    <DatePicker
                        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                        locale='ja'
                        selected={dueDate}
                        onChange={handleChange}
                        placeholderText="日付を選択してください"
                        dateFormat="yyyy/MM/dd"
                        isClearable
                        showMonthDropdown
                        showYearDropdown
                        todayButton="今日"
                        dropdownMode="select"
                        // カレンダーのヘッダ部分をカスタマイズする
                        renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled
                        }) => {
                            return (
                                <div
                                    style={{ margin: 10, display: "flex", justifyContent: "center" }}>

                                    {/* 年の部分 */}
                                    <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)} >
                                        {years.map((option) => (
                                            // eraHandler()で年のプルダウンに元号を付ける
                                            <option key={option} value={option}>{option}年（{eraHandler(option)}）</option>
                                        ))}
                                    </select>

                                    {/* 月の部分 */}
                                    <select value={months[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))} >
                                        {months.map(option => (
                                            <option key={option} value={option}> {option}月 </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        }
                    />
                </React.Fragment>
                </label>
                <button className="bg-green-700 font-semibold text-white py-2 px-4 rounded" onClick={onSubmit}>追加</button>
            </form>
        </div>
    );
};

export default New;