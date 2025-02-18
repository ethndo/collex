import { useTheme } from "@emotion/react";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useEffect, useState } from "react";
import AlertBar from "../AlertBar";
import { useRouter } from "next/router";
import SuccessBar from "../SuccessBar";
import CollectiblesPreview from "../collection/CollectiblesPreview";

const AddWishlistModal = ({
  addOpen,
  setAddOpen,
  wooliesSeries,
  colesSeries,
  getMyWishlist,
  myWishlist,
  myCollectibles,
}) => {
  ////////// STATE VARIABLES //////////
  const [alignment, setAlignment] = useState("Woolworths");
  const [toAdd, setToAdd] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  ////////// HANDLERS //////////
  const handleAlignmentChange = (e) => {
    setAlignment(e.target.value);
  };

  const getNotWishlisted = (collectibles) => {
    let myWishlistNames = myWishlist.map((item) => item["name"]);
    let myCollectibleNames = myCollectibles.map((item) => item["name"]);
    let notWishlisted = [];

    // Don't display any collectibles that are already wishlisted
    for (const collectible of collectibles) {
      if (
        !myWishlistNames.includes(collectible["name"]) &&
        !myCollectibleNames.includes(collectible["name"])
      ) {
        notWishlisted = [...notWishlisted, collectible];
      }
    }

    return notWishlisted;
  };

  const handleToAddCollectible = (collectible) => {
    if (!toAdd.includes(collectible)) {
      setToAdd([...toAdd, collectible]);
    } else {
      setToAdd(
        toAdd.filter((item) => {
          return item !== collectible;
        })
      );
    }
  };

  const handleAddWishlist = async () => {
    for (const collectible of toAdd) {
      const response = await fetch(
        `http://localhost:8080/wishlist/add_to_wishlist?username=${router.query.user}&collectible_id=${collectible["id"]}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();

      // Check response status code
      if (response.status !== 200) {
        setAlertMessage(data.message);
        setAlertOpen(true);
        return;
      }

      if (data.error) {
        alert(data.error);
      }
    }

    setSuccessOpen(true);
    getMyWishlist();
    setToAdd([]);
  };

  const getCollectibles = async () => {
    const response = await fetch(
      "http://localhost:8080/collectible/get_all_collectibles",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      alert(data.error);
    }
  };

  ////////// STYLES //////////
  const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    alignItems: "center",
    gap: "2vh",
    color: "black",
    "& label.Mui-focused": {
      color: "#8c52ff",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#8c52ff",
      },
    },
  };

  const collectibleContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    maxHeight: { xs: "75px", sm: "85px", md: "95px", lg: "100px" },
    background: theme.palette.primary.main,
    border: "1px solid",
    borderColor: theme.palette.border.main,
    overflow: "auto",
  };

  const providerStyle = {
    width: { xs: "70px", sm: "80px", md: "90px" },
  };

  const seriesContainerStyle = {
    width: { xs: "70vw", sm: "50vw" },
    overflow: "auto",
    height: { xs: "35vh", sm: "45vh" },
    border: "1px solid",
    borderColor: theme.palette.border.main,
    background: theme.palette.tertiary.main,
  };

  const addButtonStyle = {
    background: "#8c52ff",
    fontSize: { lg: "12pt" },
    width: { xs: "150px", md: "150px", lg: "180px" },
    height: { xs: "55px", md: "60px" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    textTransform: "none",
    color: "white",
    "&:hover": {
      background: "#8c52ff",
    },
    marginTop: "3vh",
  };

  const toggleStyle = {
    width: { xs: "100px", sm: "110px", md: "130px", lg: "150px" },
  };

  ////////// USE EFFECTS //////////
  useEffect(() => {
    getCollectibles();
    setToAdd([]);
    setAlignment("Woolworths");
  }, []);

  useEffect(() => {
    setToAdd([]);
  }, [addOpen]);

  useEffect(() => {
    if (addOpen === false) {
      setAlignment("Woolworths");
    }
  }, [addOpen]);

  return (
    <>
      <SuccessBar
        isOpen={successOpen}
        handleClose={() => {
          setSuccessOpen(false);
        }}
        message="Successfully added to wishlist!"
      />

      <AlertBar
        isOpen={alertOpen}
        handleClose={() => {
          setAlertOpen(false);
        }}
        message={alertMessage}
      />

      <Modal
        open={addOpen}
        onClose={() => {
          setAddOpen(false);
        }}
        sx={modalStyle}
      >
        <Paper
          className="flex"
          sx={{
            flexDirection: "column",
            width: { xs: "90vw", sm: "70vw" },
            height: { xs: "70vh", sm: "80vh" },
            background: theme.palette.primary.main,
            border: "2px solid",
            borderColor: theme.palette.border.main,
          }}
        >
          <Button
            className={styles.scaleButton}
            onClick={() => {
              setAddOpen(false);
            }}
            sx={{
              position: "absolute",
              left: { xs: "calc(4vw)", sm: "calc(15vw)" },
              top: { xs: "calc(16vh)", sm: "calc(11vh)" },
            }}
          >
            <ArrowBackRoundedIcon
              sx={{
                color: "#e65c53",
                width: { xs: 30, md: 35, lg: 40 },
                height: { xs: 30, md: 35, lg: 40 },
              }}
            />
          </Button>

          <Typography
            variant="h3"
            sx={{
              marginTop: "1vh",
              marginBottom: "1vh",
              fontSize: { xs: "20pt", sm: "22pt", md: "25pt", lg: "30pt" },
            }}
          >
            Add to Wishlist
          </Typography>

          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={(e) => {
              handleAlignmentChange(e);
            }}
          >
            <ToggleButton value="Woolworths" sx={toggleStyle}>
              Woolworths
            </ToggleButton>

            <ToggleButton value="Coles" sx={toggleStyle}>
              Coles
            </ToggleButton>
          </ToggleButtonGroup>

          <Paper
            elevation={0}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              borderRadius: "18px",
              background: theme.palette.primary.main,
              width: { xs: "80vw", sm: "60vw" },
              height: { xs: "48vh", sm: "58vh" },
              marginTop: "2vh",
            }}
          >
            <FormControl sx={formStyle} onSubmit={handleAddWishlist}>
              {alignment === "Woolworths" && (
                <Paper elevation={0} sx={seriesContainerStyle}>
                  <Box
                    component="img"
                    src="/Woolworths.png"
                    sx={providerStyle}
                  />
                  {wooliesSeries.map((series, index) => (
                    <CollectiblesPreview
                      key={index}
                      series={series.series_name}
                      collectibles={getNotWishlisted(series.collectibles)}
                      handler={handleToAddCollectible}
                      buffer={toAdd}
                      containerStyle={collectibleContainerStyle}
                    />
                  ))}
                </Paper>
              )}

              {alignment === "Coles" && (
                <Paper elevation={0} sx={seriesContainerStyle}>
                  <Box component="img" src="/Coles.png" sx={providerStyle} />
                  {colesSeries.map((series, index) => (
                    <CollectiblesPreview
                      key={index}
                      series={series.series_name}
                      collectibles={getNotWishlisted(series.collectibles)}
                      handler={handleToAddCollectible}
                      buffer={toAdd}
                      containerStyle={collectibleContainerStyle}
                    />
                  ))}
                </Paper>
              )}

              <Button
                type="submit"
                disabled={toAdd.length === 0}
                variant="outlined"
                onClick={() => {
                  handleAddWishlist();
                }}
                sx={addButtonStyle}
              >
                Add Collectible
              </Button>
            </FormControl>
          </Paper>
        </Paper>
      </Modal>
    </>
  );
};

export default AddWishlistModal;
