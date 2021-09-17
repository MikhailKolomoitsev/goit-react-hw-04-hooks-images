import './App.css'
import { useState, useEffect } from 'react'
import Searchbar from './components/Searchbar/Searchbar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import Button from './components/Button/Button'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Modal from './components/Modal/Modal'

export default function App() {
  const [searchQuery, setSearchQuery] = useState(null)
  const [pics, setPics] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const key = '23098764-6c28342abea29650d4f55356c'
  let url = `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`

  useEffect(() => {
    if (searchQuery === null) { return }
    setShowLoader(true)
    setTimeout(() => {
      axios.get(url).then((response) => response.data.hits).then(pics => {
        if (pics.length) {
          setPics(prevState => (
            [...prevState, ...pics]
          ))
        } else { alert(`${searchQuery} is not found`) }
      }).catch(error => alert(error)).finally(() => setShowLoader(false))
    }, 500)
  }, [currentPage, searchQuery, url])

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [pics]);



  const saveInputeQuery = (query) => {
    setSearchQuery(null)
    setPics([])
    setShowModal(false)
    setModalImage('')
    setShowLoader(false)
    setSearchQuery(query)

  }
  const toggleModal = () => {
    setShowModal(prevState => !prevState)
  }

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1)
  }

  const modalOpener = (link) => {
    setShowModal(!showModal)
    return (
      setModalImage(link)
    )
  }
  return (
    <div className="App" >
      <Searchbar onSubmit={saveInputeQuery} />
      <ImageGallery
        pics={pics}
        openlargeimage={(e) =>
          modalOpener(e.target.dataset.large)}
      />
      {showLoader && (
        <Loader
          className="spin"
          type="Bars"
          color="#00BFFF"
          height={80}
          width={80}
        />
      )}
      {pics.length > 0 &&
        <Button onClick={loadMore} />}

      {showModal && (
        <Modal toggleModal={toggleModal}
          src={modalImage} />
      )}
    </div>
  )

}


