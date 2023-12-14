import React, {ChangeEvent, useState} from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  SxProps,
  SelectChangeEvent, Typography, Card, CardContent, Input, Box, TextField
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {Link, Route, BrowserRouter, Routes, useNavigate} from 'react-router-dom';
import axios, {AxiosResponse} from "axios";

enum Color {
  COOL = 'Cool',
  WARM = 'Warm',
  NEUTRAL = 'Neutral'
}

enum Music {
  ROCK = 'Rock',
  HIP_HOP = 'Hip hop',
  FOLK_TRADITIONAL = "Folk/Traditional\n",
  JAZZ_BLUES= "Jazz/Blues",
  POP = 'Pop',
  ELECTRONIC =  'Electronic',
  RANDB_SOUL = "R&B and soul"
}

enum Alcohol {
  VODKA = "Vodka",
  WINE = "Wine",
  WHISKEY = 'Whiskey',
  BEER = "Beer",
  OTHER = 'Other',
  DOESNT_DRINK = "Doesn't drink"
}

enum Soda {
  SEVENUP_SPRITE = '7UP/Sprite',
  COCACOLA_PEPSI = 'Coca Cola/Pepsi',
  FANTA = 'Fanta',
  OTHER = 'Other'
}

enum Genre {
  MAN = "M",
  WOMAN = "F"
}

const style = {
  response: {
    marginTop: '15px'
  } as SxProps,

  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  } as SxProps,

  header: {
    backgroundColor: '#2196F3', // Bleu
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    padding: '15px',
    fontWeight: 'bold'
  } as SxProps,

  contentContainer: {
    alignSelf: 'center',
    maxWidth: '800px',
    margin: '15px'
  },

  title: {
    fontSize: 23,
    marginBottom: '10px', // Ajout de marge en bas pour les titres
    color: '#673AB7', // Violet
  },

  selectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  selector: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
  },

  card: {
    marginBottom: '20px', // Ajout de marge en bas pour les cartes
    backgroundColor: '#FFC107', // Jaune
  },

  button: {
    marginTop: '25px',
    maxWidth: '100px',
    backgroundColor: '#4CAF50', // Vert
    color: 'white',
    '&:hover': {
      backgroundColor: '#45a049', // Légère modification de couleur au survol
    },
  },

  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },

  cardContent: {
    textAlign: 'center'
  },

  icon: {
    fontSize: 80,
    marginBottom: '15px',
  },
}

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <Box sx={style.contentContainer}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>
        Bienvenue sur notre projet AZIA
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <Typography variant="h5">
          Découvrez la diversité à travers les préférences
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Objectif du projet
            </Typography>
            <Typography variant="body1">
              Notre objectif est d'utiliser la technologie pour créer une communauté inclusive où les gens peuvent
              partager leurs préférences en matière de couleur, de musique, d'alcool, de soda, et bien plus encore.
              Nous croyons que la diversité des goûts individuels contribue à la richesse de notre communauté.
            </Typography>
          </CardContent>
        </Card>

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => navigate('/hub')}>
            Démarrer maintenant
          </Button>
        </Box>
      </Box>
    </Box>
)}

const PhotoFormPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [manProbability, setManProbability] = useState(0);
  const [womanProbability, setWomanProbability] = useState(0);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const url = 'http://127.0.0.1:3001/image';
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
          .then((response) => {
            console.log(response.data);

            setWomanProbability(Math.round(response.data[0].probability * 100));
            setManProbability(Math.round(response.data[1].probability * 100));
          })
          .catch((error) => {
            console.error('Erreur lors de la requête :', error);
          });
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  };

  return (
      <Box>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>
          Formulaire avec Champ Photo
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Input type="file" id="photo-input" onChange={handleFileChange} />

          {selectedFile && (
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Fichier sélectionné : {selectedFile.name}
              </Typography>
          )}

          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 3 }}>
            Envoyer le formulaire
          </Button>

          {womanProbability !== 0 || manProbability !== 0 ? womanProbability > manProbability ?
              <Box sx={{ marginTop: 3 }}>Je pense que vous êtes une femme à {womanProbability}%</Box>
              : <Box sx={{ marginTop: 3 }}>Je pense que vous êtes un homme à {manProbability}%</Box>: null}
        </Box>
      </Box>
  );
};

const TextualForm = () => {

  const [color, setColor] = useState(Color.COOL);
  const [music, setMusic] = useState(Music.ROCK);
  const [alcohol, setAlcohol] = useState(Alcohol.VODKA);
  const [soda, setSoda] = useState(Soda.COCACOLA_PEPSI);

  const [response, setResponse] = useState<Genre | null>(null);

  const onClickColor = (event: SelectChangeEvent<string>) => {
    setColor(event.target.value as Color);
  };

  const onClickMusic = (event: SelectChangeEvent<string>) => {
    setMusic(event.target.value as Music);
  };

  const onClickAlcohol = (event: SelectChangeEvent<string>) => {
    setAlcohol(event.target.value as Alcohol);
  };

  const onClickSoda = (event: SelectChangeEvent<string>) => {
    setSoda(event.target.value as Soda);
  };

  const handleSubmit = () => {
    const url = 'http://127.0.0.1:3001/score';
    const body =  {
          "Inputs": {
            "input1": [
            {
              "Favorite Color": color,
              "Favorite Music Genre": music,
              "Favorite Beverage": alcohol,
              "Favorite Soft Drink": soda
            }
          ]
        },
        "GlobalParameters": {}
      }

    axios.post(url, body)
        .then((response: AxiosResponse<{ Survived: Genre }, null>) => {
          const genre = response.data.Survived as Genre;
          setResponse(genre);
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error);
        });
  };

  return (
        <Box sx={style.contentContainer}>
          <Box sx={style.selectorContainer}>
            <Box sx={style.title}>Choisissez vos préférences :</Box>
            <Box sx={style.selector}>
              <InputLabel id="couleur-label">Couleur :</InputLabel>
              <Select labelId="couleur-label" name="couleur" onChange={onClickColor} defaultValue={Color.COOL}>
                <MenuItem value={Color.COOL}>Froide</MenuItem>
                <MenuItem value={Color.WARM}>Chaude</MenuItem>
                <MenuItem value={Color.NEUTRAL}>Neutre</MenuItem>
              </Select>
            </Box>

            <Box sx={style.selector}>
              <InputLabel id="musique-label">Genre de musique :</InputLabel>
              <Select labelId="musique-label" name="musique" onChange={onClickMusic} defaultValue={Music.POP}>
                <MenuItem value={Music.ROCK}>Rock</MenuItem>
                <MenuItem value={Music.HIP_HOP}>Hip Hop</MenuItem>
                <MenuItem value={Music.FOLK_TRADITIONAL}>Folk/Traditional</MenuItem>
                <MenuItem value={Music.JAZZ_BLUES}>Jazz Blues</MenuItem>
                <MenuItem value={Music.POP}>Pop</MenuItem>
                <MenuItem value={Music.ELECTRONIC}>Electronic</MenuItem>
                <MenuItem value={Music.RANDB_SOUL}>R&B and Soul</MenuItem>
              </Select>
            </Box>

            <Box sx={style.selector}>
              <InputLabel id="alcool-label">Alcool :</InputLabel>
              <Select labelId="alcool-label" name="alcool" onChange={onClickAlcohol} defaultValue={Alcohol.VODKA}>
                <MenuItem value={Alcohol.VODKA}>Vodka</MenuItem>
                <MenuItem value={Alcohol.WINE}>Vin</MenuItem>
                <MenuItem value={Alcohol.WHISKEY}>Whisky</MenuItem>
                <MenuItem value={Alcohol.BEER}>Bière</MenuItem>
                <MenuItem value={Alcohol.OTHER}>Other</MenuItem>
                <MenuItem value={Alcohol.DOESNT_DRINK}>Ne boit pas</MenuItem>
              </Select>
            </Box>

            <Box sx={style.selector}>
              <InputLabel id="soda-label">Soda :</InputLabel>
              <Select labelId="soda-label" name="soda" onChange={onClickSoda} defaultValue={Soda.SEVENUP_SPRITE}>
                <MenuItem value={Soda.SEVENUP_SPRITE}>7UP/Sprite</MenuItem>
                <MenuItem value={Soda.COCACOLA_PEPSI}>Coca Cola/Pepsi</MenuItem>
                <MenuItem value={Soda.FANTA}>Fanta</MenuItem>
                <MenuItem value={Soda.OTHER}>Other</MenuItem>
              </Select>
            </Box>
          </Box>

          <Button sx={style.button} variant="contained" color="primary" onClick={handleSubmit}>
            Envoyer
          </Button>

          {response ? response === Genre.MAN ? <Box sx={style.response}>Vous êtes un Homme</Box> : <Box sx={style.response}>Vous êtes une Femme</Box> : null}
        </Box>
  );
};

const HubPage = () => {
  return (
      <Box sx={style.contentContainer}>
          <Typography variant="h4">Quelle fonctionnalité voulez-vous essayer ?</Typography>

        <Box sx={style.cardContainer}>
          <Link to="/text">
            <Card sx={{ ...style.card, backgroundColor: '#FFC107', marginTop: '30px', height: '50vh', width: '20vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent sx={style.cardContent}>
                <TextFieldsIcon sx={{ ...style.icon, color: '#FF9800' }} />
                <Typography variant="h5">Formulaire Textuel</Typography>
              </CardContent>
            </Card>
          </Link>

          <Link to="/photo">
            <Card sx={{ ...style.card, backgroundColor: '#E91E63', marginTop: '30px', height: '50vh', width: '20vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent sx={style.cardContent}>
                <PhotoCameraIcon sx={{ ...style.icon, color: '#F06292' }} />
                <Typography variant="h5">Formulaire Photo</Typography>

              </CardContent>
            </Card>
          </Link>
        </Box>
      </Box>
  );
}

const App = () => {
  return (
      <BrowserRouter>
        <Box sx={style.container}>
          <Box sx={style.header}> AZIA </Box>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/text" Component={TextualForm} />
            <Route path="/hub" Component={HubPage} />
            <Route path="/photo" Component={PhotoFormPage}/>
          </Routes>
        </Box>
      </BrowserRouter>
  );
};

export default App;
