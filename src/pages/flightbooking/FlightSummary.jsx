import React from 'react';
import { Card, CardContent, Typography, Button, IconButton, Box } from '@mui/material';
import { Share, MoreHoriz } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { dateToTimeFormat, minToTime } from '../../utils/common';
import Grid from '@mui/material/Grid2';

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    margin: 'auto',
    boxShadow: 'none',
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.5rem',
    [theme.breakpoints.up('sm')]: {
        fontSize: '2rem',
    },
}));

const ViewDealButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#000',
    },
    borderRadius:'10px',
    width:'100px',
    fontSize:'12px',
    textTransform:'capitalize',
    fontWeight:'600'
}));

export default function FlightSummary({ data, legs }) {
    return (
        <StyledCard>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <div></div>
                    <Box>
                        <IconButton size="small" aria-label="share">
                            <Share fontSize="small" />
                        </IconButton>
                        <IconButton size="small" aria-label="more options">
                            <MoreHoriz fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 8 }}>
                        <Box display="flex" alignItems="flex-start">
                            <Box mr={2}>
                                <img src={legs.carriers.marketing[0].logoUrl} alt="Air India" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Box>
                                <Typography variant="h6" component="div">
                                    {dateToTimeFormat(legs.departure)} - {dateToTimeFormat(legs.arrival)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {legs.origin.displayCode}-{legs.destination.displayCode}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={1} mb={1}>
                                    <Typography variant="body2" mr={2}>
                                        {legs.segments.length - 1} stop{legs.segments.length > 2 && "s"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mr={2}>
                                        {legs.segments.slice(0, legs.segments.length - 1).map((obj) => obj.destination.displayCode)?.toString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        {minToTime(legs.durationInMinutes)}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" mb={1}>
                                    {legs.carriers.marketing[0].name}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent={"space-around"} height={'100%'}>
                            <PriceTypography component="div" gutterBottom>
                                {data?.price?.formatted}
                            </PriceTypography>
                            <ViewDealButton variant="contained" fullWidth>
                                View Detail
                            </ViewDealButton>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </StyledCard>
    );
}

