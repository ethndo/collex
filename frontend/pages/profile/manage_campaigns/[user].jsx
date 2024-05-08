import Nav from "@/components/Nav";
import AdminPanel from "@/components/admin/AdminPanel";
import ManageCampaignsPanel from "@/components/admin/manage/ManageCampaignsPanel";
import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ManageCampaignsPage = ({ toggleTheme }) => {
  const theme = useTheme();

  const router = useRouter();

  ////////// USE EFFECTS //////////
  useEffect(() => {
    let name = localStorage.getItem("username");
    if (router.query.user && name) {
      if (router.query.user !== name) {
        router.push("/");
      }
    }
  }, [router.query.user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Nav toggleTheme={toggleTheme} />
      <Box
        bgcolor={theme.palette.primary.main}
        sx={{
          color: theme.palette.text.main,
          minHeight: "calc(100vh - 85px)",
          marginTop: "85px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            width: "100vw",
          }}
        >
          <Grid item xs={12} sm={3}>
            <AdminPanel />
          </Grid>
          <Grid item xs={12} sm={9}>
            <ManageCampaignsPanel />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ManageCampaignsPage;
