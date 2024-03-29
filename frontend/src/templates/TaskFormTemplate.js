import { useState, useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";


function TaskFormTemplate(props){
    const submitHandler = props.submitHandler;
    const titlePlaceholder = props.titlePlaceholder;
    const descPlaceholder = props.descPlaceholder;

    const currentTitle = props.titleValue?props.titleValue:'';
    const currentDesc = props.descValue?props.descValue:''
    const currentPriority = props.priorityValue?props.priorityValue:'low';
    const currentStatus = props.statusValue?props.statusValue:'todo';

    const [titleValue,setTitle] = useState(props.titleValue?props.titleValue:'');
    const [descValue,setDesc] = useState(props.descValue?props.descValue:'');
    const [priorityValue,setPriority] = useState(props.priorityValue?props.priorityValue:'low');
    const [statusValue,setStatus] = useState(props.statusValue?props.statusValue:'todo');

    const modified = useRef(false);

    const navigate = useNavigate();
    const location = useLocation();

    function onChange(e){
        const name = e.target.name;
        const setFunction = {
            'title':setTitle,
            'priority': setPriority,
            'status':setStatus,
            'desc':setDesc
        }
        setFunction[name](e.target.value);
        modified.current = true;
    }

    function onCancel(e){
        e.preventDefault();
        const task_id = new URLSearchParams(location.search).get('id')
        if (task_id){
            return navigate('/tasks?id='+task_id);
        }
        navigate('/tasks');
    }

    function onReset(e){
        e.preventDefault();
        setTitle(currentTitle);
        setDesc(currentDesc);
        setPriority(currentPriority);
        setStatus(currentStatus);
    }
    return (
        <div className="form-page">
            <form className='form form-group create-form' onSubmit={submitHandler}>
                <label htmlFor="new-task-input">Title</label>
                <input name = 'title' className = 'form-control' id=' new-task-input' placeholder={titlePlaceholder} value={titleValue} onChange = {onChange}></input>
                <div className='dropdowns'>
                    <div className='dropdown'>
                        <label>priority</label>
                        <select name = 'priority' className = 'create-select form-control' id = 'new-task-priority' value = {priorityValue} onChange={onChange}>
                            <option value = 'low'>low</option>
                            <option value = 'medium'>medium</option>
                            <option value = 'high'>high</option>
                        </select>
                    </div>
                    <div className='dropdown'>
                        <label>status</label>
                        <select name = 'status' className = 'create-select form-control' id = 'new-task-status' value ={statusValue} onChange={onChange}>
                            <option value = 'todo'>todo</option>
                            <option value = 'in_progress'>in progress</option>
                            <option value = 'done'>done</option>
                        </select>
                    </div>
                </div>
                <label htmlFor='new-task-description'>description</label>
                <textarea name = 'desc' className ='form-control' id = 'new-task-description' rows="15" placeholder={descPlaceholder} value={descValue} onChange={onChange}></textarea>
                <div className="form-buttons">
                    <button className = 'btn btn-primary' type="reset" onClick={onReset}>Reset</button>
                    <button className = 'btn btn-primary' type="button" onClick={onCancel}>Cancel</button>
                    <button className = 'btn btn-primary' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TaskFormTemplate;