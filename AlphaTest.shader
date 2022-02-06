Shader "Custom/AlphaTest"
{
    Properties
    {
        _MainTex ("Albedo (RGB)", 2D) = "white" {}
        _MainTex2 ("Albedo (RGB)", 2D) = "white" {}
    }

    SubShader
    {
        
        // Tags { "RenderType"="Opaque"} // No Alpha 
        Tags { "RenderType"="Transparent" "Queue"="Transparent" } // Alpha
        LOD 200

        CGPROGRAM
        /* No Alpha */
        // #pragma surface surf Standard fullforwardshadows 
        /* Alpha */
        #pragma surface surf Standard alpha:fade
        sampler2D _MainTex;
        sampler2D _MainTex2;
        struct Input
        {
            float2 uv_MainTex;
            float2 uv_MainTex2;
        };

        void surf (Input IN, inout SurfaceOutputStandard o)
        {
            fixed4 c = tex2D (_MainTex, IN.uv_MainTex);
            fixed4 d = tex2D (_MainTex2, float2(IN.uv_MainTex2.x - _Time.y, IN.uv_MainTex2.y));
            o.Emission = c.rgb * d.rgb; // 아 하나라도 0인 부분은 노출되게 하지 않기 위해?
            o.Alpha = c.a * d.a;
        }
        ENDCG
    }
    FallBack "Diffuse"
}
