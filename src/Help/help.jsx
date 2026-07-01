import classes from './help.module.css';

export default function Help({ques, ans,key,index}){
    return <div className={classes.quesContainer}> 
            <h3>Q{index+1}. {ques}</h3>
            <p>{ans}</p>
    </div>
}