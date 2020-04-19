import React from 'react';
import './custom.css';
import {connect} from 'react-redux';
import {Button,Input,message } from 'antd';

class Twitter_Interface extends React.Component {

constructor(){
  super();

  this.state={
    search:null,
    keyword:null,
    Searched_data:''
    
  };
  this.ref=React.createRef()
}

searchSpace=(event)=>{
  let keyword = event.target.value;
  this.setState({keyword})
}

mySubmitHandler = (event) => {
  event.preventDefault();
  const {keyword}=this.state;


  const sear=this.ref.current.value
  this.setState({search:keyword})

  console.log('++++++++++++++++++++++++++++++++++++++++++++',sear)

  if(sear){
  
  
  localStorage.setItem('user_data',JSON.stringify(sear))


  
  //console.log(  localStorage.getItem('user_data')
  
  message.info('Data saved successfully...(LocalStorage)')


    }


  
  


}

render(){

  const searched_data=[]
  const items = this.props.data.filter((data)=>{
    if(this.state.search === null){
      searched_data.length=0

        return data
    }
    else if(data.text.toLowerCase().includes(this.state.search.toLowerCase())){
        
        searched_data.push(data.text)

        return data
    }
  }).map(data=>{


    
    return(
    <div key={data.id} className='main-content'>
     
     <div className="tw-block-parent">
  <div className="timeline-TweetList-tweet">
    <div className="timeline-Tweet">
      <div className="timeline-Tweet-brand">
        <div className="Icon Icon--twitter"></div>
      </div>
      <div className="timeline-Tweet-author">
        <div className="TweetAuthor"><a class="TweetAuthor-link" href="/"> </a><span className="TweetAuthor-avatar"> 
    <div className="Avatar"></div></span><span className="TweetAuthor-name"></span><span className="Icon Icon--verified"> </span>
    <span className="TweetAuthor-screenName">
      @{data.user.name ?data.user.name : 'Luke Warm'}</span></div>
      </div>
    <div className="timeline-Tweet-text">{data.text ? data.text : 
    'Film tells story of how almost 400 journalists managed the investigation in the #PanamaPapers..'}</div>
    <div>
    </div>
    friends_count:<li className='timeline-Tweet-action'><a  href="/">{data.user.friends_count}</a></li>

      <div className="timeline-Tweet-metadata"><span className="timeline-Tweet-timestamp">{data.user.location}</span></div>
      <ul className="timeline-Tweet-actions">
        <li className="timeline-Tweet-action"><a className="Icon Icon--heart" href="/"></a></li>
        <li className="timeline-Tweet-action"><a className="Icon Icon--share" href="/"></a></li>
      </ul>
    </div>
  </div>
</div>
          
        
    </div>
    )
  })
  return (
    <div>
     <form style={{marginTop:'20px'}} onSubmit={this.mySubmitHandler}>
    <Input style={{width:'415px'}} onChange={(e)=>this.searchSpace(e)} 
    placeholder="Enter the item to be searched.." />
    <input type='hidden' ref={this.ref} value={searched_data} />
    &nbsp;    <Button htmlType='submit' >Submit</Button>
 </form>
   {items.length === 0 ? <h2 style={{marginTop:'55px'}}>No Data for Serached term</h2> : items }
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

