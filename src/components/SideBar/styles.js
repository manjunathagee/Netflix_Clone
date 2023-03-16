import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  image: {
    width: '70%',
  },
  links: {
    color: theme?.pallet?.text?.primary,
    textDecoration: 'none',
  },
  genereImages: {
    filter: theme?.pallet?.mode === 'dark' ? 'dark' : 'invert(1',
  },
}));
