import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { useSelector } from "react-redux"


export const ImageGallery = () => {

  const { active } = useSelector( state => state.journal );

  const galleryContent= (
    active.imageUrls.map((item, i) => (
      <ImageListItem key={i}>
        <img
          src={`${item}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          loading="lazy"
        />
      </ImageListItem>
    ))
  )

  return (
    <>
      <ImageList sx={{maxWidth: '800px', mx: 'auto', width: '100%', height: '400px', display: {xs: 'none', md: 'grid'} }} cols={ 3 } rowHeight={'auto'}>
        { galleryContent }
      </ImageList>
      <ImageList sx={{width: '100%', height: '400px', display: {xs: 'none', sm: 'grid', md: 'none'} }} cols={ 2 } rowHeight={'auto'}>
        { galleryContent }
      </ImageList>
      <ImageList sx={{width: '100%', height: '400px', display: {xs: 'grid', sm: 'none'} }} cols={ 1 } rowHeight={'auto'}>
        { galleryContent }
      </ImageList>
    </>
  )
}

// const galleryContent= (
  //   itemData.map((item) => (
  //     <ImageListItem key={item.img}>
  //       <img
  //         src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
  //         srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
  //         alt={item.title}
  //         loading="lazy"
  //       />
  //     </ImageListItem>
  //   ))
  // )