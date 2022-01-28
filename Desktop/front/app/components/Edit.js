import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Index from "./Index"
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import ja from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from "react-datepicker";
// import './Index.css';


// jaのロケールの設定が週頭が月曜始まりになっているので日曜始まりにする
ja.options.weekStartsOn = 0;
// ReactDatepickerのロケール登録
registerLocale('ja', ja);

class Edit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          content: this.props.content,
          duedate: this.props.duedate,
          date: ""

        }
    }

    componentDidMount() {
      axios.get('/tasks.json')
      .then(resp => {
      });
    }
    
    handleClickCancel = () => {
      this.props.onCancel(this.props.id, "editing", false);
    };

    handleOnSubmit = (values) => {
      let date;
      if(this.state.date === "") {
        date = this.state.duedate
      } else {
        date = this.state.date
      };
      var data = {
        content: values.content,
        duedate: date
      }
      console.log(date)
      axios.patch(`/tasks/${this.props.id}`, data)
      // this.props.onCancel(this.props.id, "editing", false);
    }
    
    render() {
      
      var handleDateChange = date => {
        this.setState({
          duedate: date,
          date: date
        })
        console.log(date)
        console.log(this.props.duedate)
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
      return (
        <div>
          <div className="flex justify-center">
            <h3 className="text-gray-700">編集</h3>
          </div>
          <div className="flex justify-center">

            <Formik
              initialValues={{ content: this.state.content}}
              onSubmit={(values) => this.handleOnSubmit(values)}
              validationSchema={Yup.lazy(values => {
                // if (values.content === "") {
                //   return Yup.object().shape({
                //     content: Yup.string().max(100, '本文は200文字以内で入力してください').required('本文は必須項目です'),
                //   });
                // } else {
                // if (values.content === "content") {
                  return Yup.object().shape({
                    content: Yup.string().max(100, '本文は100文字以内で入力してください').required('本文は必須項目です'),
                    // pet: Yup.string().required(),
                    // petName: Yup.string().required(),
                  });
                // }
              })}
            >
            {
              ({ handleSubmit, handleChange, handleBlur, handleCancel, values, errors, touched, setFieldValue }) => (
                <Form>
                  <FormGroup>
                    <Input
                      className="py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                      type="content"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(errors.content && touched.content)}
                    />
                    <FormFeedback className="text-red-500">
                      {errors.content}
                    </FormFeedback>
                    <React.Fragment>
                    <DatePicker
                      className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                      locale='ja'
                      selected={this.state.date}
                      onChange={handleDateChange}
                      placeholderText="日付を選択してください"
                      dateFormat="yyyy-MM-dd"
                      isClearable
                      showMonthDropdown
                      showYearDropdown
                      todayButton="今日"
                      dropdownMode="select"
                      value={this.state.duedate}
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
                  </FormGroup>
                  <FormGroup></FormGroup>
                  <Button onClick={handleSubmit} className="bg-green-700 font-semibold text-white py-2 px-4 rounded">編集する</Button>
                  <Button onClick={() => this.handleClickCancel()} className="ml-10 bg-red-700 font-semibold text-white py-2 px-4 rounded">キャンセル</Button>
                </Form>
              )
            }
          </Formik>
          </div>
        </div>
      );
    }
}


export default Edit;