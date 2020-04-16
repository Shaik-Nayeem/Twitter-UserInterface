import React from 'react';
import './custom.css';
import {connect} from 'react-redux';

class Twitter_Interface extends React.Component {

constructor(){
  super();

  this.state={
    search:null,
    
  };
}

searchSpace=(event)=>{
  let keyword = event.target.value;
  this.setState({search:keyword})
}

render(){
  const items = this.props.data.filter((data)=>{
    if(this.state.search == null)
        return data
    else if(data.text.toLowerCase().includes(this.state.search.toLowerCase()) || data.text.toLowerCase().includes(this.state.search.toLowerCase())){
        return data
    }
  }).map(data=>{
    return(
    <div className='main-content'>
     
     <div class="tw-block-parent">
  <div class="timeline-TweetList-tweet">
    <div class="timeline-Tweet">
      <div class="timeline-Tweet-brand">
        <div class="Icon Icon--twitter"></div>
      </div>
      <div class="timeline-Tweet-author">
        <div class="TweetAuthor"><a class="TweetAuthor-link" href="#channel"> </a><span class="TweetAuthor-avatar"> 
    <div class="Avatar"></div></span><span class="TweetAuthor-name"></span><span class="Icon Icon--verified"> </span><span class="TweetAuthor-screenName">@{data.user.name}</span></div>
      </div>
    <div class="timeline-Tweet-text">{data.text}</div>
    <div>
    </div>
    friends_count:<li class='timeline-Tweet-action'><a  href="#">{data.user.friends_count}</a></li>

      <div class="timeline-Tweet-metadata"><span class="timeline-Tweet-timestamp">{data.user.location}</span></div>
      <ul class="timeline-Tweet-actions">
        <li class="timeline-Tweet-action"><a class="Icon Icon--heart" href="#"></a></li>
        <li class="timeline-Tweet-action"><a class="Icon Icon--share" href="#"></a></li>
      </ul>
    </div>
  </div>
</div>
          
        
    </div>
    )
  })

  return (
    <div>
    <input style={{marginTop:'15px',width:'500px'}} type="text" placeholder="Enter item to be searched"  onChange={(e)=>this.searchSpace(e)} />
    
    {items}
    </div>
  )
}
}


//Connect fn to access data 
const mapStateToProps=(state)=>{
  console.log(state)
    return {data:state.twitter_data}
}
export default connect(mapStateToProps)(Twitter_Interface);

