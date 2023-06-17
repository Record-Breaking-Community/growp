import { AccountCircle } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { useEffect, useState, MouseEvent } from 'react'
import { useQueryClient } from 'react-query'
import { useLogout } from '~/lib/hooks/useLogout'

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const client = useQueryClient()
  const user = client.getQueryData('user')
  const cookies = parseCookies()
  const [auth, setAuth] = useState<boolean>(!!user)

  const { mutate } = useLogout()

  useEffect(() => {
    setAuth(user || cookies.access_token ? true : false)
  }, [user])

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onClickLogout = () => {
    handleClose()
    mutate()
    setAuth(false)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-controls='menu-appbar'
        aria-haspopup='true'
        aria-label='account of current user'
        color='inherit'
        onClick={handleMenu}
        size='large'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id='menu-appbar'
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {auth ? (
          <div>
            <MenuItem onClick={handleClose}>
              <Link href='/profile'>アカウント情報</Link>
            </MenuItem>
            <MenuItem onClick={onClickLogout}>ログアウト</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose}>
              <Link href='/login'>ログイン</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href='/signup'>新規登録</Link>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  )
}

export default AccountMenu
