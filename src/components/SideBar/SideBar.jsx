import React from 'react';
import { Divider, List, ListItemText, ListSubheader, ListItemIcon, ListItemButton, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const SideBar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching, error } = useGetGenresQuery();
  const dispatch = useDispatch();

  if (error) {
    return 'An Error has occured..';
  }
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme?.palette?.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                <ListItemText primary={label} />
              </ListItemIcon>
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Generes</ListSubheader>
        {isFetching
          ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )
          : data?.genres?.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                  <ListItemText primary={name} />
                </ListItemIcon>
              </ListItemButton>
            </Link>
          ))}
      </List>
    </>
  );
};

export default SideBar;
