
import './article.css';

function Article(data: any) {
    const parseDate = (date: any) => {
        const curdate = new Date(date);
        return curdate.toUTCString();
    }
    return (
        <>
            {
                data.data.length > 0 && data.data.map((tab: any) => (
                    <div className="article">
                        <div className='article_content'>
                            <div className='article_content_heading'>
                                {tab.title}
                            </div>
                            <div className='article_content_detail'>
                                <div>{tab.author}</div>
                                <div>{parseDate(tab.publishedAt)}</div>
                            </div>
                            <div className='article_content_content'>
                                {tab.content}
                            </div>
                        </div>
                        <div className='article_img'>
                            <img className='article_image' src={tab.urlToImage} alt='' />
                        </div>
                    </div>
                ))

            }
        </>

    )
}

export default Article;
