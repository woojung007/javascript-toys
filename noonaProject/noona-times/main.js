let news = [];
let page = 1;
let total_pages = 0;
let totalPage = 1;
let menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));
let searchButton = document.getElementById("search-button");
let url;


//각 함수에서 필요한 url을 만든다
//api 호출 함수를 부른다
    const getNews = async() => {
        try{
            let header = new Headers({'x-api-key' : '2gaPHlzNfZTDWlH9LMLZY14-fj-xaOhRb_8rjsxavOI'});
            url.searchParams.set('page' , page);    //&page
            console.log("url?",url)
            // 서버에 요청을 보냄
            // ajax, http, fetch, axios
            let response = await fetch(url,{headers:header});     
            let data = await response.json();
        
            if(response.status == 200){
                if(data.total_hits == 0){
                    throw new Error("검색된 결과값이 없습니다.")
                }

                console.log("받는 데이터?",data);
                news = data.articles;
                totalPage = data.total_pages;
                page = data.page
                console.log(news);
                render();
                pagination();
            }else{
                throw new Error(data.message)
            }

        }catch(error){
            console.log("error is", error.message);
            errorRender(error.message);
        }

    }
    
    const getLatestNews = async () => {
        url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    
        getNews();
    };
    
    
    const getNewsByTopic = async(event) => {
        console.log("click!! ", event.target.textContent);
        let topic = event.target.textContent.toLowerCase();
        url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
    
        getNews();
    }
    
    const getNewsByKeyword = async () => {
        //1. 검색 키워드 읽어오기
        //2. url 에 검색 키워드 붙이기
        //2. 헤더준비
        //4. url 부르기
        //5. 데이터 가져오기
        //6. 데이텨 보여주기
    
        let keyword = document.getElementById("search-input").value;
        url = new URL(
            `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
        
        getNews();
    }
    
    const render = () => {
        let newsHTML = "";
        newsHTML = news
        .map((item) => {
            return `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" 
                    src="${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" alt="">
            </div>
            <div class="col-lg-8">
                <h2>${item.title}</h2>
                <p>
                    ${
                        item.summary == null || item.summary == ""
                        ? "내용 없음"
                        : item.summary.length > 200
                        ? item.summary.substring(0,200) + "..."
                        : item.summary
                    }
                </p>
    
                <div>
                    ${item.rights || "no source"} 
                    * ${moment(
                        item.published_date
                    ).fromNow()}
                </div>
            </div>
        </div>`;
        })
        .join('');
    
        document.getElementById("news-board").innerHTML = newsHTML;
    };

    const pagination = () => {
        let paginationHTML = ``;
        //total_page
        //page
        //page group
        let pageGroup = Math.ceil(page/5)
        //last
        let last = pageGroup * 5;

        //마지막 그룹이 5개 이하이면
        if(last > totalPage){
            last = totalPage;
        }

        //first
        let first = last - 4 <= 0 ? 1 : last - 4;   //첫 그룹이 5 이하이면
        if(first >= 6){
            paginationHTML = 
            `<li class="page-item" onclick="pageClick(1)">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" onclick="moveToPage(${page-1})">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&lt;</span>
                </a>
            </li>`;
        }
        for(let i = first; i <= last; i ++){
            paginationHTML += `<li class="page-item ${
                page == i ? "active" : ""
            }"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
        }


        if(last < totalPage){
            paginationHTML+=
            `<li class="page-item" onclick = "moveToPage(${page+1})">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&gt;</span>
                </a>
            </li>
            <li class="page-item" onclick = "moveToPage(${totalPage})">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>`;
    
        }
        document.querySelector(".pagination").innerHTML = paginationHTML;
    };

    const moveToPage = (pageNum) => {
        //1.이동하고 싶은 페이지를 알아야겟지
        page = pageNum;
        //2. 이동하고 싶은 페이지를 가지고 api를 다시 호출 해주자
        getNews();
    }

    searchButton.addEventListener("click", getNewsByKeyword);
    getLatestNews();
    
    const pageClick = (pageNum) => {
        //7.클릭이벤트 세팅
        page = pageNum;
        window.scrollTo({ top: 0, behavior: "smooth" });
        getNews();
    };
    const errorRender = (message) => {
        document.getElementById(
        "news-board"
        ).innerHTML = `<h3 class="text-center alert alert-danger mt-1">${message}</h3>`;
    };

    getLatestNews();
