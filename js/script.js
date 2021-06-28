document.querySelector(".button-container").addEventListener("click",()=>{
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredjobs = filterJobs(jobs, text);
        showJobs(filteredjobs)
    })
})

function getJobs(){
    return fetch("data.json").then(Response => Response.json())
    .then(data => {
        console.log(data);
        return data;
    })
}

function filterJobs(jobs, searchText){
    if(searchText){
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                || job.company.toLowerCase().includes(searchText)
                || job.description.toLowerCase().includes(searchText)
                || job.description.toLowerCase().includes(searchText)){
                    return true;
                }
                else{
                    return false;
                }
        })
        return filteredJobs;
    }
    else{
        return jobs;
    }
}

function showJobs(jobs){
    console.log(jobs);
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach(job => {
        jobsHTML += `
            <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt="image">
                    <span class="material-icons more_horiz">more horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>
        `
    })

    jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data);
});