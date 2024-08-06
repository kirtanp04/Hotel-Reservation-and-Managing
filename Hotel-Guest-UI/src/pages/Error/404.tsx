import { Box, keyframes, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Path } from "src/Router/path";

export default function Errorage404() {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate(Path.root);
  };
  return (
    <RootStyle>
      <ContentWrapper>
        <ImageWrapper>
          <ImageOne src={ImageOnesrc} />
          <ImageTwo
            src={ImageTwosrc}
            sx={{ animation: `${bounceAnimation} 3s ease-in-out infinite` }}
          />
          <ImageTwo
            src={ImageThreesrc}
            sx={{ animation: `${bounceAnimation} 15s ease-in-out infinite` }}
          />
          <ImageTwo
            src={ImageFoursrc}
            sx={{ animation: `${bounceAnimation} 12s ease-in-out infinite` }}
          />
        </ImageWrapper>
      </ContentWrapper>

      <ContentWrapper>
        <TextContentWrapper>
          <SomethingWrong>Something is wrong</SomethingWrong>
          <Text>
            The page you are lookin was moved, removed, renamed, or might never
            exist!
          </Text>
          <HomeButton onClick={onClickHome}>Home</HomeButton>
        </TextContentWrapper>
      </ContentWrapper>
    </RootStyle>
  );
}

const RootStyle = styled(Box)(() => ({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const ContentWrapper = styled(Box)(() => ({
  padding: "24px 0px 0px 24px",
  margin: "0px",
  flexGrow: 0,
  flexBasis: "100%",
}));

const ImageWrapper = styled(Box)(() => ({
  maxWidth: 500,
  margin: "0px auto",
  position: "relative",
}));

const TextContentWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  alignItems: "center",
  padding: "12px",
  gap: "10px",
}));

const SomethingWrong = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: "2rem",
  color: theme.palette.text.primary,
  fontWeight: 700,
  lineHeight: 1.167,
}));

const Text = styled(Typography)(({ theme }) => ({
  margin: 0,
  letterSpacing: "0em",
  fontWeight: 400,
  lineHeight: "1.5em",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  textAlign: "center",
}));

const ImageOne = styled("img")(() => ({
  display: "block",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  width: "100%",
  objectFit: "cover",
}));

const HomeButton = styled(Box)(({ theme }) => ({
  padding: "5px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  color: theme.palette.text.primary,
  backgroundColor: theme.themeColor,
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "1rem",
}));

const ImageTwo = styled("img")(() => ({
  display: "block",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  width: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
}));

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ImageOnesrc =
  "data:image/svg+xml,%3csvg%20width='676'%20height='391'%20viewBox='0%200%20676%20391'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20opacity='0.09'%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%204.49127%20197.53)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20342.315%20387.578)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%2028.0057%20211.105)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20365.829%20374.002)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%2051.52%20224.68)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20389.344%20360.428)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%2075.0345%20238.255)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20412.858%20346.852)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%2098.5488%20251.83)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20436.372%20333.277)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20122.063%20265.405)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20459.887%20319.703)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20145.578%20278.979)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20483.401%20306.127)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20169.092%20292.556)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20506.916%20292.551)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20192.597%20306.127)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20530.43%20278.977)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20216.111%20319.703)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20553.944%20265.402)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20239.626%20333.277)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20577.459%20251.827)'%20stroke='%238492C4'/%3e%3cpath%20d='M263.231%20346.905L601.064%20151.871'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20600.973%20238.252)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20286.654%20360.428)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20624.487%20224.677)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20310.169%20374.002)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20648.002%20211.102)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(0.866041%20-0.499972%20-0.866041%20-0.499972%20333.683%20387.578)'%20stroke='%238492C4'/%3e%3cline%20y1='-0.5'%20x2='390.089'%20y2='-0.5'%20transform='matrix(-0.866041%20-0.499972%20-0.866041%200.499972%20671.516%20197.527)'%20stroke='%238492C4'/%3e%3c/g%3e%3c/svg%3e";

const ImageTwosrc =
  "data:image/svg+xml,%3csvg%20width='676'%20height='391'%20viewBox='0%200%20676%20391'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M267.744%20237.142L279.699%20230.24L300.636%20242.329L288.682%20249.231L313.566%20263.598L286.344%20279.314L261.46%20264.947L215.984%20291.203L197.779%20282.558L169.334%20211.758L169.092%20211.618L196.313%20195.902L267.744%20237.142ZM219.359%20265.077L240.523%20252.859L204.445%20232.029L205.487%20234.589L219.359%20265.077Z'%20fill='%23FFAB91'/%3e%3cpath%20d='M469.959%20120.206L481.913%20113.304L502.851%20125.392L490.897%20132.294L515.78%20146.661L488.559%20162.377L463.675%20148.011L418.199%20174.266L399.994%20165.621L371.548%2094.8211L371.307%2094.6816L398.528%2078.9654L469.959%20120.206ZM421.574%20148.141L442.737%20135.922L406.66%20115.093L407.701%20117.653L421.574%20148.141Z'%20fill='%23FFAB91'/%3e%3cpath%20d='M204.523%20235.027V232.237L219.401%20265.014L240.555%20252.926V255.018L218.936%20267.339L204.523%20235.027Z'%20fill='%23D84315'/%3e%3cpath%20d='M406.738%20118.09V115.301L421.616%20148.078L442.77%20135.99V138.082L421.151%20150.402L406.738%20118.09Z'%20fill='%23D84315'/%3e%3crect%20width='109.114'%20height='136.405'%20transform='matrix(0.866025%20-0.5%200.866025%200.5%20220.507%20181.925)'%20fill='url(%23paint0_linear)'/%3e%3crect%20width='40.2357'%20height='70.0545'%20transform='matrix(0.866025%20-0.5%200.866025%200.5%20280.437%20201.886)'%20fill='url(%23paint1_linear)'/%3e%3crect%20x='25.1147'%20width='80.1144'%20height='107.405'%20transform='matrix(0.866025%20-0.5%200.866025%200.5%20223.872%20194.482)'%20stroke='%231565C0'%20stroke-width='29'/%3e%3crect%20x='25.1147'%20width='80.1144'%20height='107.405'%20transform='matrix(0.866025%20-0.5%200.866025%200.5%20223.872%20194.482)'%20stroke='url(%23paint2_linear)'%20stroke-width='29'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M279.517%20230.177L267.662%20237.15L196.064%20195.772L168.866%20211.58L169.331%20212.097L170.096%20214.002L196.436%20198.795L267.866%20240.035L279.821%20233.133L298.211%20243.751L300.787%20242.265L279.517%20230.177ZM291.278%20250.695L288.804%20252.124L311.1%20264.996L313.805%20263.418L291.278%20250.695Z'%20fill='%23D84315'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M481.732%20113.24L469.877%20120.214L398.279%2078.8359L371.081%2094.6433L371.546%2095.1603L372.311%2097.0652L398.651%2081.8581L470.081%20123.099L482.036%20116.196L500.426%20126.814L503.002%20125.328L481.732%20113.24ZM493.493%20133.759L491.019%20135.187L513.315%20148.06L516.02%20146.482L493.493%20133.759Z'%20fill='%23D84315'/%3e%3cpath%20d='M288.674%20252.229V249.207L291.929%20251.067L288.674%20252.229Z'%20fill='%23D84315'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear'%20x1='77.7511'%20y1='139.902'%20x2='-10.8629'%20y2='8.75671'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%233076C8'/%3e%3cstop%20offset='0.992076'%20stop-color='%2391CBFA'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear'%20x1='25.8162'%20y1='51.0447'%20x2='68.7073'%20y2='-5.41524'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232E75C7'/%3e%3cstop%20offset='1'%20stop-color='%234283CC'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint2_linear'%20x1='-16.1224'%20y1='-47.972'%20x2='123.494'%20y2='290.853'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='white'/%3e%3cstop%20offset='1'%20stop-color='white'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";

const ImageThreesrc =
  "https://berrydashboard.io/assets/img-error-blue-XncUp_kk.svg";

const ImageFoursrc =
  "data:image/svg+xml,%3csvg%20width='710'%20height='391'%20viewBox='0%200%20710%20391'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='26.9258'%20height='26.7576'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%20161.088%20154.333)'%20fill='%23EDE7F6'/%3e%3crect%20width='24.9267'%20height='24.7709'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%20162.809%20155.327)'%20fill='%23B39DDB'/%3e%3crect%20width='26.9258'%20height='26.7576'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%20536.744%20181.299)'%20fill='%23EDE7F6'/%3e%3crect%20width='24.9267'%20height='24.7709'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%20538.465%20182.292)'%20fill='%23B39DDB'/%3e%3cg%20filter='url(%23filter0_d)'%3e%3cpath%20d='M67.7237%20137.573V134.673H64.009V140.824L64.0177%20140.829C64.0367%20141.477%2064.4743%20142.121%2065.3305%20142.615L103.641%20164.733C105.393%20165.744%20108.232%20165.744%20109.983%20164.733L204.044%20110.431C204.879%20109.949%20205.316%20109.324%20205.355%20108.693L205.355%20108.692V108.68C205.358%20108.628%20205.358%20108.576%20205.355%20108.523L205.362%20102.335L200.065%20104.472L165.733%2084.6523C163.982%2083.6413%20161.142%2083.6413%20159.391%2084.6523L67.7237%20137.573Z'%20fill='url(%23paint0_linear)'/%3e%3c/g%3e%3crect%20width='115.933'%20height='51.5596'%20rx='5'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%2062.1588%20134.683)'%20fill='%23673AB7'/%3e%3crect%20width='115.933'%20height='51.5596'%20rx='5'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%2062.1588%20134.683)'%20fill='url(%23paint1_linear)'%20fill-opacity='0.3'/%3e%3cmask%20id='mask0'%20mask-type='alpha'%20maskUnits='userSpaceOnUse'%20x='64'%20y='78'%20width='141'%20height='81'%3e%3crect%20width='115.933'%20height='51.5596'%20rx='5'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%2062.1588%20134.683)'%20fill='%23673AB7'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0)'%3e%3c/g%3e%3cmask%20id='mask1'%20mask-type='alpha'%20maskUnits='userSpaceOnUse'%20x='64'%20y='78'%20width='141'%20height='81'%3e%3crect%20width='115.933'%20height='51.5596'%20rx='5'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%2062.1588%20134.683)'%20fill='%23673AB7'/%3e%3c/mask%3e%3cg%20mask='url(%23mask1)'%3e%3crect%20width='64.3732'%20height='64.3732'%20rx='5'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%20111.303%2081.6006)'%20fill='%235E35B1'/%3e%3crect%20opacity='0.7'%20x='0.866041'%20width='63.3732'%20height='63.3732'%20rx='4.5'%20transform='matrix(0.866041%20-0.499972%200.866041%200.499972%2079.1848%2087.8305)'%20stroke='%235E35B1'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d'%20x='0.0090332'%20y='83.894'%20width='269.353'%20height='229.597'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'/%3e%3cfeOffset%20dy='84'/%3e%3cfeGaussianBlur%20stdDeviation='32'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.403922%200%200%200%200%200.227451%200%200%200%200%200.717647%200%200%200%200.2%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear'%20x1='200.346'%20y1='102.359'%20x2='71.0293'%20y2='158.071'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23A491C8'/%3e%3cstop%20offset='1'%20stop-color='%23D7C5F8'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear'%20x1='8.1531'%20y1='-0.145767'%20x2='57.1962'%20y2='72.3003'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='white'/%3e%3cstop%20offset='1'%20stop-color='white'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
