import React from 'react'
import NewArticle from './addposts'
import ArticlesView from './poststable'

//Basic structure of article module
const Posts = (props) => {
    return(
        <div>
            <NewArticle/>
            <br/><br/>
            <ArticlesView posts={require('../../../data/posts.json').posts}   />
        </div>
    )
}

export default Posts