import React from 'react';

import {
    AspectRatio,
    Button,
    Typography,
} from '../../../../../packages/react/src';

export const App = () => {
    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 8,
                display: 'flex',
                gap: 16,
                width: 460,
            }}
        >
            <AspectRatio ratio="2:3" style={{ width: 120, borderRadius: 8 }}>
                <img src="https://uniformcss.com/assets/img/uniform-hoodie.jpg" />
            </AspectRatio>
            <div style={{ flex: 1 }}>
                <Typography skin="secondary" size="small">
                    Unisex
                </Typography>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}
                >
                    <Typography size="h6">Uniform Hoodie</Typography>
                    <Typography size="h6">50€</Typography>
                </div>
                <div>
                    <Typography>Size</Typography>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button size="sm" skin="secondary">
                            XS
                        </Button>
                        <Button size="sm" skin="secondary">
                            S
                        </Button>
                        <Button size="sm" skin="secondary">
                            M
                        </Button>
                        <Button size="sm" skin="secondary">
                            L
                        </Button>
                        <Button size="sm" skin="secondary">
                            XL
                        </Button>
                    </div>
                </div>
                <Typography size="small">
                    Free shipping on orders over 100€.
                </Typography>
            </div>
        </div>
    );
};
