import { useTheme } from "@emotion/react";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import styles from "@/styles/Home.module.css";
import CollectibleContainer from "../CollectibleContainer";

const WishlistPanel = ({ canEdit, setEditOpen, myWishlist }) => {
  const theme = useTheme();

  ////////// STYLES //////////
  const gridPaperStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "calc(100vh - 85px)",
    paddingTop: "10px",
    paddingBottom: "10px",
    background: theme.palette.tertiary.main,
    overflow: "auto",
  };

  const wishlistContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  };

  const imageContainerStyle = {
    display: "flex",
    width: { xs: "80px", sm: "90px", md: "110px" },
    height: { xs: "80px", sm: "90px", md: "110px" },
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "18px",
  };

  return (
    <Paper sx={gridPaperStyle}>
      <Box
        className="flex"
        sx={{
          width: "100%",
          marginBottom: "1vh",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Wishlist
        </Typography>

        {canEdit && (
          <Tooltip title="Edit Wishlist">
            <IconButton
              onClick={() => {
                setEditOpen(true);
              }}
              size="medium"
              sx={{
                position: "absolute",
                right: "0",
                marginRight: "3vw",
              }}
            >
              <EditRoundedIcon
                sx={{
                  color: "#8c52ff",
                  width: { xs: 30, md: 35, lg: 40 },
                  height: { xs: 30, md: 35, lg: 40 },
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Paper
        elevation={0}
        sx={{
          width: "70vw",
          height: "75vh",
          background: theme.palette.primary.main,
          border: "1px solid",
          borderColor: theme.palette.border.main,
          padding: "10px",
          overflow: "auto",
        }}
      >
        {myWishlist.length === 0 ? (
          <Box
            className="flex"
            sx={{
              height: "100%",
            }}
          >
            <Typography>
              User currently has no collectibles in their wishlist.
            </Typography>
          </Box>
        ) : (
          <Box sx={wishlistContainerStyle}>
            {myWishlist.map((collectible, index) => (
              <Box
                className={styles.scaleButton}
                sx={imageContainerStyle}
                key={index}
              >
                <CollectibleContainer
                  collectible={collectible}
                  imageStyle={imageStyle}
                  isProfile={false}
                />
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Paper>
  );
};

export default WishlistPanel;
