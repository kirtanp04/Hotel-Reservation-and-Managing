import {
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { enumJobStatus, Job } from "./DataObject";
import LoadingSkeleton from "src/components/Skeleton";
import { RESIconButton } from "src/components/RESIconButton";
import { ApplyIcon } from "src/assets/iconify";
import showMessage from "src/util/ShowMessage";
import showLoading from "src/util/ShowLoading";

export default function JobDetail() {
  const { jobtitle, jobID, propertyName, propertyID } = useParams();
  const [ObjJobdetail, setJobDetail] = useState<Job>(new Job());
  const theme = useTheme();

  useEffect(() => {
    getJobDetail();
  }, []);

  const getJobDetail = () => {
    showLoading(theme, true);
    try {
      Job.GetJobDetail(
        propertyID!,
        jobID!,
        (res) => {
          showLoading(theme, false);
          setJobDetail(res);
        },
        (err) => {
          showLoading(theme, false);
          showMessage(err, "error", theme, () => {});
        }
      );
    } catch (error: any) {
      showMessage(error.message, "error", theme, () => {});
    }
  };

  return (
    <Page title={`${jobtitle} | Job preview | ${propertyName}`}>
      <RootStyle>
        <HeaderWrapper>
          <LoadingSkeleton
            isLoading={ObjJobdetail._id !== "" ? false : true}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              //   gap: "5px",
            }}
            variant="text"
          >
            <HeaderText>{ObjJobdetail.PropertyName}</HeaderText>
            <HeaderText
              sx={{
                fontSize: "1.3rem",
                color: theme.palette.color.info.darker,
              }}
            >
              {ObjJobdetail.title}
            </HeaderText>
          </LoadingSkeleton>
        </HeaderWrapper>

        <ContentWrapper>
          <Grid container>
            <Grid xl={10} lg={10} md={10} item>
              <TextWrapper>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>Location :</Label>
                  <Text>{ObjJobdetail.location}</Text>
                </TextSkeleton>
              </TextWrapper>

              <TextWrapper>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>Salary :</Label>
                  <Text sx={{ color: theme.palette.color.rose.main }}>
                    {ObjJobdetail.currency + " "}
                    {ObjJobdetail.salary}
                  </Text>
                </TextSkeleton>
              </TextWrapper>

              <TextWrapper>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>Type :</Label>
                  <Text>{ObjJobdetail.JobType}</Text>
                </TextSkeleton>
              </TextWrapper>

              <TextWrapper>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>Description :</Label>
                  <Text>{ObjJobdetail.description}</Text>
                </TextSkeleton>
              </TextWrapper>

              <TextWrapper>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>Category :</Label>
                  <Text>{ObjJobdetail.category}</Text>
                </TextSkeleton>
              </TextWrapper>

              <TextWrapper>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>Status :</Label>

                  <Chip
                    label={ObjJobdetail.status}
                    variant="filled"
                    size="small"
                    sx={{
                      width: 80,
                      backgroundColor:
                        ObjJobdetail.status === enumJobStatus.OPEN
                          ? theme.palette.color.success.lighter
                          : ObjJobdetail.status === enumJobStatus.CLOSED
                          ? theme.palette.color.rose.lighter
                          : ObjJobdetail.status === enumJobStatus.PENDING
                          ? theme.palette.color.warning.lighter
                          : "",
                    }}
                  />
                </TextSkeleton>
              </TextWrapper>

              <TextWrapper>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>Experience :</Label>
                  <Text>{ObjJobdetail.experience}</Text>
                </TextSkeleton>
              </TextWrapper>
            </Grid>

            <Grid
              xl={2}
              lg={2}
              md={2}
              item
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              {ObjJobdetail._id !== "" && (
                <RESIconButton
                  iconposition="start"
                  starticon={<ApplyIcon />}
                  variant="outlined"
                  onClick={() => {}}
                >
                  Apply
                </RESIconButton>
              )}
            </Grid>
          </Grid>
        </ContentWrapper>

        <Divider
          flexItem
          orientation="horizontal"
          sx={{ margin: "0.5rem 0rem 0.5rem 0rem" }}
        />

        <ContentWrapper>
          <Grid container>
            <Grid xl={5.5} lg={5.5} md={12} item>
              <HeaderWrapper
                sx={{
                  padding: "0.3rem",
                  minHeight: "max-content",
                  borderWidth: "0px",
                }}
              >
                <LoadingSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.5rem",
                  }}
                  variant="text"
                >
                  <HeaderText
                    sx={{
                      fontSize: "1.3rem",
                    }}
                  >
                    Job Requirements
                  </HeaderText>
                </LoadingSkeleton>
              </HeaderWrapper>

              <LoadingSkeleton
                isLoading={ObjJobdetail._id !== "" ? false : true}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  //   gap: "5px",
                }}
                variant="text"
              >
                <List>
                  {ObjJobdetail.requirements.map((res, i) => (
                    <ListItem key={i}>
                      <Text sx={{ color: theme.palette.text.secondary }}>
                        {i + 1 + ") "} {res}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </LoadingSkeleton>
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid xl={5.5} lg={5.5} md={12} item>
              <HeaderWrapper
                sx={{
                  padding: "0.3rem",
                  minHeight: "max-content",
                  borderWidth: "0px",
                }}
              >
                <LoadingSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.5rem",
                  }}
                  variant="text"
                >
                  <HeaderText
                    sx={{
                      fontSize: "1.3rem",
                    }}
                  >
                    Job Benefits
                  </HeaderText>
                </LoadingSkeleton>
              </HeaderWrapper>

              <LoadingSkeleton
                isLoading={ObjJobdetail._id !== "" ? false : true}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  //   gap: "5px",
                }}
                variant="text"
              >
                <List>
                  {ObjJobdetail.benefits.map((benf, i) => (
                    <ListItem key={i}>
                      <Text sx={{ color: theme.palette.text.secondary }}>
                        {i + 1 + ") "} {benf}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </LoadingSkeleton>
            </Grid>
          </Grid>
        </ContentWrapper>

        <Divider
          flexItem
          orientation="horizontal"
          sx={{ margin: "0.5rem 0rem 0.5rem 0rem" }}
        />

        <ContentWrapper>
          <LoadingSkeleton
            isLoading={ObjJobdetail._id !== "" ? false : true}
            sx={{
              width: "100%",
              height: "100%",
            }}
            variant="text"
          >
            {ObjJobdetail.customInfo.map(({ label, value }, i) => (
              <TextWrapper key={i}>
                <TextSkeleton
                  isLoading={ObjJobdetail._id !== "" ? false : true}
                >
                  <Label>{label} :</Label>
                  <Text>{value}</Text>
                </TextSkeleton>
              </TextWrapper>
            ))}
          </LoadingSkeleton>
        </ContentWrapper>
      </RootStyle>
    </Page>
  );
}

const RootStyle = styled(Box)(() => ({
  minHeight: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  minHeight: 60,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "0.7rem",

  //   paddingRight: "1rem",
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.text.primary,
  fontFamily: "Heading",
}));

// const HeaderHotelAction = styled(Typography)(() => ({
//   display: "flex",
//   alignItems: "center",
//   gap: "15px",
// }));

const TextWrapper = styled(Box)(() => ({
  width: "100%",
  padding: "0.3rem 0rem 0.3rem 0rem",
  display: "flex",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  flex: 1,
}));
const TextSkeleton = styled(LoadingSkeleton)(() => ({
  width: "100%",
  display: "flex",
  gap: "10px",
  height: "100%",
  //   alignItems: "center",
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("xl")]: {
    fontSize: "0.85rem",
  },
  width: "7rem",
  textAlign: "end",
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: theme.palette.text.primary,
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   whiteSpace: "nowrap",
  textWrap: "wrap",
  [theme.breakpoints.down("xl")]: {
    fontSize: "0.85rem",
  },
  display: "flex",
  flex: 1,
}));

const ContentWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "1rem",
}));
