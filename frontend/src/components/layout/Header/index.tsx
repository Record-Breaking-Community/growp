import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import AccountMenu from './AccountMenu'
import { useLayout } from '../../provider/LayoutProvider'

const Header = () => {
  const { layoutValue } = useLayout()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = (value: boolean) => setIsDrawerOpen(value)

  return (
    <header>
      <AppBar className='bg-[#F5A0A0]' position='static'>
        <Toolbar>
          <IconButton
            aria-label='menu'
            color='inherit'
            edge='start'
            onClick={() => toggleDrawer(true)}
            size='large'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='div' sx={{ flexGrow: 1 }} variant='h6'>
            {layoutValue.siteTitle}
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        onClose={() => toggleDrawer(false)}
        open={isDrawerOpen}
      >
        <Box
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={() => setIsDrawerOpen(false)}
          sx={{ flexGrow: 1 }}
        >
          <div className='h-screen w-60 bg-[#F5A0A0]'>
            <List className='flex h-1/4 flex-col gap-4'>
              <ListItemButton
                className='text-xl font-bold'
                component='a'
                href='/login'
              >
                診断テスト
              </ListItemButton>
              <ListItemButton
                className='text-xl font-bold'
                component='a'
                href='/diagnosis/result'
              >
                診断結果
              </ListItemButton>
              <ListItemButton
                className='text-xl font-bold'
                component='a'
                href='/login'
              >
                ステージページ
              </ListItemButton>
            </List>
          </div>
        </Box>
      </Drawer>
    </header>
  )
}

export default Header
