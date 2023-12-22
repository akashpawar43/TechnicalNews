import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import Navbar from './Navbar';


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general",
    }

    static PropTypes = {
        name: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    // articles = [
    //     {
    //         "title": "ECB introduces independent cricket regulator",
    //         "description": "The England and Wales Cricket Board (ECB) has introduced an independent regulator in response to damning independent report into the game.",
    //         "url": "http://www.bbc.co.uk/sport/cricket/67618663",
    //         "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/1563C/production/_131921678_gettyimages-1525996211.jpg",
    //         "content": "The Independent Commission for Equity in Cricket received more than 4,000 responses to its call for evidence\r\nThe England and Wales Cricket Board (ECB) has introduced an independent regulator in resp… [+1531 chars]"
    //     }
    // ]

    constructor() {
        super();
        console.log("Constructor from News Components")
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=678e4e7064ff46048d2c5169a5a1fadb&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=678e4e7064ff46048d2c5169a5a1fadb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("next");

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=678e4e7064ff46048d2c5169a5a1fadb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
            <>
                <section className='w-full bg-black'>
                    <div className=' container mx-auto p-6'>
                        <h2 className='p-3 mb-5 text-white text-center font-bold text-2xl' >Technical15 - Top News</h2>
                        {this.state.loading && <Spinner />}
                        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                            {!this.state.loading && this.state.articles.map((element) => (
                                <div key={element.url} >
                                    {/* <NewsItems key={element.url} title={element.title.length>38 ? element.title.slice(0,38) : element.title} description={element.description.length>82 ? element.description.slice(0,82) : element.description} imageUrl={element.urlToImage} newsUrl={element.url} /> */}
                                    <NewsItems key={element.url} title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 82) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                                </div>
                            ))}
                        </div>
                        <div class="inline-flex p-8 justify-between w-full">
                            <button disabled={this.state.page <= 1} class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 " onClick={this.handlePrevClick}>
                                &larr; Prev
                            </button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50" onClick={this.handleNextClick}>
                                Next &rarr;
                            </button>
                        </div>
                    </div>
                </section >
            </>
        )
    }
}
