import React from 'react';
// import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Index from './Index';
import New from './New';
import Edit from './Edit';
import Search from './Search'
import axios from 'axios';
// import './Index.css';
// import '../css/tailwind.css';
import Link from 'next/Link'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: "index"
        }
    }

    componentDidMount() {
        axios.get('/modes.json')
        .then(resp => {
            var mode = resp.data.map((filter) => filter.filter)
            this.setState({filter: mode[0]});
        });
    }
    
    handleChange(event) {
        var data = {
            filter: event
        }
        this.setState({filter: event})
        axios.post('/modes', data)
        .then(resp => {
            this.setState({filter: event});
        });
    }
    
    render() {
        let getFilter;
        if (this.state.filter === "index") {
            getFilter = <Index />
        } else if (this.state.filter === "new") {
            getFilter = <New />
        } else {
            getFilter = <Search />
        }
    
        return(
            
            <div>
                <div className="w-5/12 flex justify-center">
                    <select value={this.state.filter} onChange={e => this.handleChange(e.target.value)}>
                        <option value="index">投稿一覧</option>
                        <option value="new">新規投稿</option>
                        <option value="search">投稿検索</option>
                    </select>
                </div>
                {getFilter}
            </div>
        )
            
        }
    }

export default App;