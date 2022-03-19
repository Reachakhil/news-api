import React, { useEffect, useState } from 'react';
import './App.css';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Article from './Article';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '20%',
  borderRadius: '20px',
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

function App() {
  const API_KEY = 'a5cf886a8dd84801a01c8b5bd0da1b0d';
  const [tabs, setTabs] = useState([{
    name: 'Tech Crunch',
    link: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`
  }, {
    name: 'Business',
    link: `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`
  }, {
    name: 'Wall Street Journal',
    link: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
  }])
  const [selected, setSelected] = useState(tabs[0])
  const [currentPageArticle, setCurrentPageArticle] = useState([])
  const [open, setOpen] = React.useState(false);
  const [catName, setCatName] = useState('')
  const [apiName, setApiName] = useState('')


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    callData(tabs[0])
  }, [tabs])

  const onSelect = (tabVal: any) => {
    setSelected(tabVal)
    callData(tabVal)
  }
  const callData = async (tab: any) => {
    let response = await fetch(tab.link);
    if (response.status === 200) {
      let data = await response.json();
      setCurrentPageArticle(data.articles)
    }
  }
  const selectTab = () => {
    if (tabs.length === 5 || catName === '' || apiName === '') {
      handleClose()
    } else {
      setTabs((tab) => {
        const link = apiName.replace('API_KEY', `${API_KEY}`)
        return [...tab, { name: catName, link: link }]
      })
      setCatName('')
      setApiName('')
      handleClose()
    }

  }


  return (
    <div className="app">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='modal-form'>
              <TextField value={catName} onChange={e => setCatName(e.target.value)} id="standard-basic" label="Category Name" variant="standard" />

              <TextField value={apiName} onChange={e => setApiName(e.target.value)} id="standard-basic" label="API URL" variant="standard" />

              <ColorButton variant="contained" onClick={selectTab} >        <AddIcon />
                ADD</ColorButton>

            </div>
          </Typography>
        </Box>
      </Modal>
      <header className="app_header">
        <div className='heading'>News Today</div>
        <div className='app_tab'>
          <div className='tab'>
            {
              tabs.map((tab, key) => {
                return (
                  <div className={`tab_name ${selected.name === tab.name ? 'selectedtab' : 'unselectedtab'}`}
                    onClick={(ev) => onSelect(tab)}
                  >{tab.name} </div>
                )
              })
            }
            <button disabled={tabs.length === 5} className='add_icon' onClick={handleOpen}>
              <AddIcon />
            </button>
          </div>

        </div>
        <div className='app_search'>
          <div className='search_bar'>
            <button className='search'><SearchIcon /></button>
            <input type="text" placeholder='Search for Keyword,Author' />

          </div>
        </div>
      </header>

      <div className='app_body'>
        <Article data={currentPageArticle} />
      </div>
    </div>
  );
}

export default App;
