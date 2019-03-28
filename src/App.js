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
      page: 1
    }
  }

  async componentDidMount() {
    await this.getArticles({
      selectedCategory: this.state.selectedCategory,
      selectedCountry: this.state.selectedCountry,
      page: this.state.page
    });
  }

  async getArticles({
    selectedCategory,
    selectedCountry,
    page
  }) {
    const newsReq = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=be77ffc5861e487383159056b09bbb96&country=${selectedCountry}&category=${selectedCategory}&page=${page}&pageSize=10`, {
      method: 'GET',
    });
    const newsRes = await newsReq.json();
    const { articles = [], totalResults = 0 } = newsRes;
    await this.setState({
      articles, totalResults, selectedCategory, selectedCountry, page
    });
  }

  async onSelect({
    fieldName,
    fieldValue
  }) {
    await this.getArticles({
      [fieldName]: fieldValue,
      [fieldName === 'selectedCategory' ? 'selectedCountry' : 'selectedCategory']:
        fieldName === 'selectedCategory' ? this.state.selectedCountry : this.state.selectedCategory,
      page: this.state.page
    });
  }

  onPageChange({
    page
  }) {
    console.log(page)
    if (page > 0 && page <= Math.ceil(this.state.totalResults / 10))
      this.getArticles({
        selectedCategory: this.state.selectedCategory,
        selectedCountry: this.state.selectedCountry,
        page
      })
  }
  render() {
    const { selectedCategory = '',
      selectedCountry = '', articles = [], totalResults = 1 } = this.state;
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
    console.log(selectedCategory, selectedCountry, articles);
    const pages = new Array(Math.ceil(this.state.totalResults / 10)).fill({});
    console.log(pages, totalResults)
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
        <ul className="list-group">
          {
            articles.map(({
              title
            }) => (
                <li key={title} className="list-group-item">{title}</li>
              ))
          }
        </ul>


        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${this.state.page > 1 ? '' : 'disabled'} `}>
              <a className="page-link" href="/" onClick={(e) => {
                e.preventDefault();
                this.onPageChange({
                  page: this.state.page - 1
                })
              }}>Previous</a>
            </li>
            {pages.map((obj, index) => (<li key={index} className="page-item"><a className="page-link" href="/" onClick={(e) => {
              e.preventDefault();
              this.onPageChange({
                page: index + 1
              })
            }}>{index + 1}</a></li>))}
            <li className={`page-item ${this.state.page <= pages - 1 ? '' : 'disabled'} `}>
              <a className="page-link" href="/" onClick={(e) => {
                e.preventDefault();
                this.onPageChange({
                  page: this.state.page + 1
                })
              }}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;
