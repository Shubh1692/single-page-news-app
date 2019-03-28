import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      selectedCategory: 'business',
      selectedCountry: 'in',
      totalResults: 0,
      pageNo: 1
    }
  }

  async componentDidMount() {
    await this.getArticles({
      selectedCategory: this.state.selectedCategory,
      selectedCountry: this.state.selectedCountry
    });
  }

  async getArticles({
    selectedCategory,
    selectedCountry
  }) {
    const newsReq = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=be77ffc5861e487383159056b09bbb96&country=${selectedCountry}&category=${selectedCategory}`, {
      method: 'GET',
    });
    const newsRes = await newsReq.json();
    const { articles = [], totalResults = 0 } = newsRes;
    await this.setState({
      articles, totalResults, selectedCategory, selectedCountry
    });
  }

  async onSelect({
    fieldName,
    fieldValue
  }) {
    await this.getArticles({
      [fieldName]: fieldValue,
      [fieldName === 'selectedCategory' ? 'selectedCountry' : 'selectedCategory']:
        fieldName === 'selectedCategory' ? this.state.selectedCountry : this.state.selectedCategory
    });
  }
  render() {
    const { selectedCategory = '',
      selectedCountry = '', articles = [] } = this.state;
    const categories = [{
      label: 'Business',
      value: 'business'
    }, {
      label: 'Entertainment',
      value: 'entertainment'
    }, {
      label: 'Health',
      value: 'health'
    }, {
      label: 'General',
      value: 'general'
    }, {
      label: 'Science',
      value: 'science'
    }, {
      label: 'Sports',
      value: 'sports'
    }, {
      label: 'Technology',
      value: 'technology'
    }];
    const countries = [{
      label: 'India',
      value: 'in'
    }, {
      label: 'Germany',
      value: 'de'
    }, {
      label: 'USA',
      value: 'us'
    }, {
      label: 'Australia',
      value: 'au'
    }]
    console.log(selectedCategory, selectedCountry, articles)
    return (
      <div className="App">
        <h1>Category</h1>
        <div className="btn-group" role="group" aria-label="Basic example">
          {
            categories.map(({
              label, value
            }) => (
                <button key={value} type="button" className={`btn btn-secondary ${selectedCategory === value ? 'btn-light' : ''}`} onClick={() => {
                  this.onSelect({
                    fieldName: 'selectedCategory',
                    fieldValue: value
                  })
                }}>{label}</button>
              ))
          }
        </div>
        <h1>Country</h1>
        {
          countries.map(({
            label, value
          }) => (
              <button key={value} type="button" className={`btn btn-secondary ${selectedCountry === value ? 'btn-light' : ''}`} onClick={() => {
                this.onSelect({
                  fieldName: 'selectedCountry',
                  fieldValue: value
                })
              }}>{label}</button>
            ))
        }
        <ul class="list-group">
          {
            articles.map(({
              title
            }) => (
                <li key={title} class="list-group-item">{title}</li>
              ))
          }
        </ul>


        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;
