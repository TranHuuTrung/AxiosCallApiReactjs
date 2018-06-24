import React, { Component } from 'react';
import axios from 'axios';

import './Blog.css';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

class Blog extends Component {

    state = {
        posts: [],
        postSelectedId: null,
        error: false
    }

    componentDidMount () {
        axios.get('/posts')
                .then( response => {
                    const posts = response.data.slice(0, 4);
                    const updatePosts = posts.map(post => {
                        return {
                            ...post, 
                            author: post.userId===1?"Trung":"Author"
                        }
                    })
                    this.setState({posts : updatePosts});
                    // console.log(response);
                })
                .catch(err => {
                    this.setState({error: true});
                });
    }

    postSelectedHandler = (id) => {
        this.setState({postSelectedId: id});
    }
    render(){
        let posts = <p>Something went wrong!</p>;
        if(!this.state.error){
            posts = this.state.posts.map( post => {
                return <Post 
                            key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked={()=>this.postSelectedHandler(post.id)}
                        /> ;
            })
        }
        
        return(
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.postSelectedId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
} 

export default Blog;